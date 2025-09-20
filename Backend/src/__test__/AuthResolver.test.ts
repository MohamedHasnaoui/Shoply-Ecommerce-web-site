// src/resolvers/__tests__/AuthResolver.test.ts
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { AuthResolver } from '../graphql/resolvers/AuthResolver.js';
import { userService } from '../services/userService';
import { emailUtil } from '../../utils/EmailUtil';
import { shoppingCartService } from '../services/ShoppingCartService.js';
import { whishListService } from '../services/WhishListService.js';
import { GraphQLError } from 'graphql';
import { Role, SignInInput, SignupIpnut } from '../graphql/types/resolvers-types.js';
import { authController } from '../controllers/AuthController.js';
import { MyContext } from '../graphql';

// Mock the modules that the resolver depends on
jest.mock('../services/userService');
jest.mock('../../utils/EmailUtil');
jest.mock('../services/ShoppingCartService');
jest.mock('../services/WhishListService');

// Create typed mock instances for better autocompletion and type safety
const mockedUserService = userService as jest.Mocked<typeof userService>;
const mockedEmailUtil = emailUtil as jest.Mocked<typeof emailUtil>;
const mockedShoppingCartService = shoppingCartService as jest.Mocked<typeof shoppingCartService>;
const mockedWhishListService = whishListService as jest.Mocked<typeof whishListService>;

describe('AuthResolver - Mutation: signup', () => {

  // This runs before each test, ensuring a clean slate
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- Test Case 1: Success Scenario (New Buyer) ---
  it('should successfully create a new buyer and their cart/wishlist', async () => {
    // 1. Arrange: Set up our test data and mock return values
    const input : SignupIpnut = { firstName:"Mohamed", lastName:"El Hasnaoui", email: 'newbuyer@test.com', password: 'password123', role: Role.Buyer };
    const newUser = { id: 'user-123', ...input, verified: false };
    const context:MyContext = {idShoppingCart:0}; // The resolver modifies this context

    // Simulate that the user does not exist in the database
    mockedUserService.findOneByEmail.mockResolvedValue(null);
    // Simulate the user creation returning the new user object
    mockedUserService.create.mockResolvedValue(newUser as any); // Using 'as any' to simplify the mock object
    // Simulate cart creation returning an ID
    mockedShoppingCartService.create.mockResolvedValue(1);

    // 2. Act: Call the function we are testing
    const result = await authController.signup!(null, { input }, context);

    // 3. Assert: Check if the outcome is what we expected
    expect(mockedUserService.findOneByEmail).toHaveBeenCalledWith(input.email);
    expect(mockedUserService.create).toHaveBeenCalledWith(input);
    expect(mockedEmailUtil.sendVerificationEmail).toHaveBeenCalledWith(newUser.email);
    // expect(mockedShoppingCartService.create).toHaveBeenCalledWith(newUser);
    // expect(mockedWhishListService.create).toHaveBeenCalledWith(newUser);
    expect(context).toHaveProperty('idShoppingCart', 'cart-456');
    expect(result).toBe(true);
  });

  // --- Test Case 2: Success Scenario (New Non-Buyer) ---
//   it('should successfully create a new user who is not a buyer', async () => {
//     // 1. Arrange
//     const input = { email: 'newseller@test.com', password: 'password123', role: 'SELLER' as Role };
//     const newUser = { id: 'user-124', ...input, verified: false };
//     const context = {};

//     mockedUserService.findOneByEmail.mockResolvedValue(null);
//     mockedUserService.create.mockResolvedValue(newUser as any);
    
//     // 2. Act
//     const result = await AuthResolver.Mutation!.signup!(null, { input }, context, null);

//     // 3. Assert
//     expect(mockedUserService.create).toHaveBeenCalledWith(input);
//     expect(mockedEmailUtil.sendVerificationEmail).toHaveBeenCalledWith(newUser.email);
//     // Crucially, assert that these were NOT called for a non-buyer
//     expect(mockedShoppingCartService.create).not.toHaveBeenCalled();
//     expect(mockedWhishListService.create).not.toHaveBeenCalled();
//     expect(result).toBe(true);
//   });

//   // --- Test Case 3: Error Scenario (User Already Exists) ---
//   it('should throw a "user already exist" error if the email is taken by a verified user', async () => {
//     // 1. Arrange
//     const input = { email: 'existing@test.com', password: 'password123', role: Role.Buyer };
//     const existingVerifiedUser = { id: 'user-001', ...input, verified: true };
//     const context = {};

//     // Simulate that the user is found in the database
//     mockedUserService.findOneByEmail.mockResolvedValue(existingVerifiedUser as any);
    
//     // 2. Act & 3. Assert
//     // We expect this operation to fail (reject a promise)
//     await expect(
//       AuthResolver.Mutation!.signup!(null, { input }, context, null)
//     ).rejects.toThrow(
//       new GraphQLError('user already exist in the database')
//     );

//     // Also, ensure no new user was created
//     expect(mockedUserService.create).not.toHaveBeenCalled();
//   });

//   // --- Test Case 4: Edge Case (Unverified User Exists) ---
//   it('should remove an existing unverified user and create a new one', async () => {
//     // 1. Arrange
//     const input = { email: 'unverified@test.com', password: 'password123', role: Role.Buyer };
//     const existingUnverifiedUser = { id: 'user-002', ...input, verified: false };
//     const newUser = { id: 'user-125', ...input, verified: false };
//     const context = {};

//     // Simulate finding the unverified user
//     mockedUserService.findOneByEmail.mockResolvedValue(existingUnverifiedUser as any);
//     // Simulate the creation of the new user
//     mockedUserService.create.mockResolvedValue(newUser as any);

//     // 2. Act
//     const result = await AuthResolver.Mutation!.signup!(null, { input }, context, null);

//     // 3. Assert
//     // Check that the old user was removed
//     expect(mockedUserService.remove).toHaveBeenCalledWith(existingUnverifiedUser);
//     // Check that the new user was still created
//     expect(mockedUserService.create).toHaveBeenCalledWith(input);
//     // Check that the email was still sent
//     expect(mockedEmailUtil.sendVerificationEmail).toHaveBeenCalledWith(newUser.email);
//     expect(result).toBe(true);
//   });
});