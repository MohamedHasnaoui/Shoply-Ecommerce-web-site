
/// <reference types="jest" />
import { AdminController } from '../../controllers/AdminController.js';
import { userService } from '../../services/userService.js';
import { productService } from '../../services/productServices.js';
import { orderService } from '../../services/OrderService.js';
import { MyContext } from '../../graphql';
import { Role, PeriodFilter, User } from '../../graphql/types/resolvers-types.js';
import { GraphQLError } from 'graphql';
import { ErrorCode } from '../../../utils/Errors.js';

// Mock the services
jest.mock('../../services/userService');
jest.mock('../../services/productServices');
jest.mock('../../services/OrderService');

let adminController : AdminController;

describe('AdminController', () => {
  let mockContext: MyContext;

  beforeEach(() => {
    adminController = new AdminController();
    // Reset mocks before each test
    jest.clearAllMocks();

    // Setup a mock context
    mockContext = {
      currentUser: {
        userId: 1,
        email: 'admin@example.com',
      },
    };
  });

  // Test for a public method that does not require admin rights
  describe('getUsers', () => {
    it('should return a list of users', async () => {
      const mockUsers = [{ id: '1', name: 'Test User' }];
      (userService.getUsers as jest.Mock) = jest.fn().mockResolvedValue(mockUsers);

      const result = await adminController.getUsers({}, { input: {} }, mockContext);

      expect(result).toEqual(mockUsers);
      expect(userService.getUsers).toHaveBeenCalledWith({});
    });
  });

  // Tests for methods requiring admin rights
  describe('Admin-only methods', () => {
    beforeEach(() => {
      // Mock the _ensureAdmin private method to simulate admin access
      (adminController as any)._ensureAdmin = jest.fn().mockResolvedValue({
        id: 1,
        role: Role.Admin,
      });
    });

    describe('getAdminHomeStatistics', () => {
      it('should return statistics for the admin homepage', async () => {
        const stats = {
          registeredSeller: 6,
          registeredBuyers: 10,
          newProducts: 20,
          newOrders: 15,
        };
        (userService.countNewBuyersAndSellers as jest.Mock) = jest.fn().mockResolvedValue({
          registeredSeller: 6,
          registeredBuyers: 10,
        });
        (productService.countNewProducts as jest.Mock) = jest.fn().mockResolvedValue(20);
        (orderService.countNewOrders as jest.Mock) = jest.fn().mockResolvedValue(15);

        const result = await adminController.getAdminHomeStatistics({}, { period: PeriodFilter.Month }, mockContext);

        expect(result).toEqual(stats);
        expect((adminController as any)._ensureAdmin).toHaveBeenCalledWith(mockContext);
      });
    });

    describe('getRegisteredUsersByPeriod', () => {
      it('should return registered users by period', async () => {
        const users = [{ id: '1', name: 'New User' }];
        (userService.getRegisteredUsersByPeriod as jest.Mock) = jest.fn().mockResolvedValue(users);

        const result = await adminController.getRegisteredUsersByPeriod({}, { period: PeriodFilter.Week, role: Role.Buyer }, mockContext);

        expect(result).toEqual(users);
        expect(userService.getRegisteredUsersByPeriod).toHaveBeenCalledWith(PeriodFilter.Week, Role.Buyer);
        expect((adminController as any)._ensureAdmin).toHaveBeenCalledWith(mockContext);
      });
    });

    describe('getBestSellers', () => {
      it('should return best-selling users', async () => {
        const bestSellers = [{ id: 'seller1', name: 'Top Seller' }];
        (userService.getBestSellers as jest.Mock) = jest.fn().mockResolvedValue(bestSellers);

        const result = await adminController.getBestSellers({}, { period: PeriodFilter.Month }, mockContext);

        expect(result).toEqual(bestSellers);
        expect(userService.getBestSellers).toHaveBeenCalledWith(PeriodFilter.Month);
        expect((adminController as any)._ensureAdmin).toHaveBeenCalledWith(mockContext);
      });
    });

    describe('getFrequentBuyers', () => {
      it('should return frequent buyer users', async () => {
        const frequentBuyers = [{ id: 'buyer1', name: 'Frequent Buyer' }];
        (userService.getFrequentBuyers as jest.Mock) = jest.fn().mockResolvedValue(frequentBuyers);

        const result = await adminController.getFrequentBuyers({}, { period: PeriodFilter.Year }, mockContext);

        expect(result).toEqual(frequentBuyers);
        expect(userService.getFrequentBuyers).toHaveBeenCalledWith(PeriodFilter.Year);
        expect((adminController as any)._ensureAdmin).toHaveBeenCalledWith(mockContext);
      });
    });

    describe('updateUserBlockStatus', () => {
      it('should update a user block status', async () => {
        const updatedUser = { id: 'user1', isBlocked: true };
        (userService.updateUserBlockStatus as jest.Mock) = jest.fn().mockResolvedValue(updatedUser);

        const result = await adminController.updateUserBlockStatus({}, { userId: 1, isBlocked: true }, mockContext);

        expect(result).toEqual(updatedUser);
        expect(userService.updateUserBlockStatus).toHaveBeenCalledWith(1, true);
        expect((adminController as any)._ensureAdmin).toHaveBeenCalledWith(mockContext);
      });
    });

    describe('updateProductDisableStatus', () => {
      it('should update a product disabled status', async () => {
        const updatedProduct = { id: 'prod1', isDisabled: true };
        (productService.updateProductDisableStatus as jest.Mock) = jest.fn().mockResolvedValue(updatedProduct);

        const result = await adminController.updateProductDisableStatus({}, { productId: 1, isDisabled: true }, mockContext);

        expect(result).toEqual(updatedProduct);
        expect(productService.updateProductDisableStatus).toHaveBeenCalledWith(1, true);
        expect((adminController as any)._ensureAdmin).toHaveBeenCalledWith(mockContext);
      });
    });
  });

  // Test access control for admin-only methods
  describe('Admin access control', () => {
    beforeEach(() => {
      // This time, we don't mock _ensureAdmin to succeed. Instead, we let it run.
      // We need to mock the service that _ensureAdmin calls.
      (userService.findOneById as jest.Mock) = jest.fn().mockImplementation(async (userId) : Promise<User> => {
        if (userId === 1) {
          return { id: 1, role: Role.Admin };
        }
        if (userId === 2) {
          return { id: 2, role: Role.Buyer };
        }
        return null;
      });
    });

    
    it('should deny access if user is not an admin', async () => {
      mockContext = {currentUser: {userId: 2, email: 'test'}};
      await expect(
        adminController.getAdminHomeStatistics({}, { period: PeriodFilter.Month }, mockContext)
      ).rejects.toThrow(
        new GraphQLError('Only Admins Can Access', {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        })
      );
    });

    it('should deny access if user is not authenticated', async () => {
      mockContext.currentUser = null; // No user logged in

      await expect(
        adminController.getAdminHomeStatistics({}, { period: PeriodFilter.Month }, mockContext)
      ).rejects.toThrow(
        new GraphQLError('Not authenticated', {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        })
      );
    });

    it('should deny access if authenticated user is not found', async () => {
        mockContext.currentUser.userId = 3;
  
        await expect(
          adminController.getAdminHomeStatistics({}, { period: PeriodFilter.Month }, mockContext)
        ).rejects.toThrow(
          new GraphQLError('Authenticated user not found', {
            extensions: { code: ErrorCode.NOT_FOUND },
          })
        );
      });
  });
});
