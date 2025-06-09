import { useEffect, useState } from "react";
import { Link } from "react-router";
import QuantityControl from "../../helper/QuantityControl";
import { shoppingCartService } from "../../services/shoppingCart";
import { cartItemService } from "../../services/cartItem";
import { CartItem, ShoppingCart } from "../../generated";
import { paymentService } from "../../services/payment";
import { useAppDispatch } from "../../redux/hooks";
import { setCartItems } from "../../redux/slices/cartSlice";
import { toast, ToastContainer } from "react-toastify";

const CartSection = () => {
  const [cart, setCart] = useState<ShoppingCart | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const handleClearCart = async () => {
    setLoading(true);
    try {
      const success = await shoppingCartService.cancelShoppingCart();
      if (success) {
        dispatch(setCartItems(null));
        setCart(null);
        alert("Panier vidé avec succès !");
      } else {
        alert("Impossible de vider le panier.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression du panier.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (
    cartItem: CartItem,
    newQuantity: number
  ) => {
    try {
      const updatedItem = await cartItemService.updateCartItem({
        id: cartItem.id,
        quantity: newQuantity,
      });

      if (updatedItem) {
        const updatedCart = await shoppingCartService.getShoppingCart();
        console.log("Mise à jour du panier :", updatedCart);
        if (updatedCart) {
          setCart(updatedCart ?? null);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Product's Quantity is not enough!")) {
          toast.error("Quantité demandée supérieure à la quantité disponible.");
          console.log("Erreur mise à jour de la quantité", error.message);
        } else {
          console.log("Erreur mise à jour de la quantité", error);
        }
      }
    }
  };
  const handleRemoveCartItem = async (cartItemId: number) => {
    try {
      const success = await cartItemService.removeCartItem(cartItemId);
      if (success) {
        const updatedCart = await shoppingCartService.getShoppingCart();
        setCart(updatedCart ?? null);
      } else {
        alert("Échec de la suppression du produit.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };
  const handleCheckout = async () => {
    try {
      const session = await paymentService.createPaymentIntent();
      if (session?.sessionUrl) {
        window.location.href = session.sessionUrl;
      } else {
        alert("Échec lors de la création de la session de paiement.");
      }
    } catch (error) {
      console.error("Erreur lors du paiement :", error);
      alert("Erreur lors du paiement.");
    }
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const result = await shoppingCartService.getShoppingCart();

        if (result && result.cartItems) {
          setCart(result);
          dispatch(setCartItems(result ?? null));
        } else {
          setCart(null);
          dispatch(setCartItems(null));
        }
      } catch (error) {
        console.error("Erreur lors du chargement du panier", error);
        setCart(null);
        dispatch(setCartItems(null));
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <p>Chargement du panier...</p>;
  if (!cart || !cart.cartItems?.length) return <p>Votre panier est vide.</p>;
  return (
    <section className="cart py-80">
      <ToastContainer />
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xl-9 col-lg-8">
            <div className="cart-table border border-gray-100 rounded-8 px-40 py-48">
              <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">
                <table className="table style-three min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="h6 mb-0 text-lg fw-bold">Delete</th>
                      <th className="h6 mb-0 text-lg fw-bold">Product Name</th>
                      <th className="h6 mb-0 text-lg fw-bold">Price</th>
                      <th className="h6 mb-0 text-lg fw-bold">Quantity</th>
                      <th className="h6 mb-0 text-lg fw-bold">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.cartItems.map((item) => (
                      <tr key={item?.id}>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleRemoveCartItem(item?.id ?? 0)}
                            className="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                          >
                            <i className="ph ph-x-circle text-2xl d-flex" />
                            Remove
                          </button>
                        </td>
                        <td>
                          <div className="table-product d-flex align-items-center gap-24">
                            <Link
                              to={`/product-details/${item?.product.id}`}
                              className="table-product__thumb border border-gray-100 rounded-8 flex-center "
                            >
                              <img
                                src={item?.product.images?.[0] ?? ""}
                                alt="img"
                              />
                            </Link>
                            <div className="table-product__content text-start w-full max-w-[250px] flex flex-col gap-8">
                              <h6 className="title text-lg fw-semibold mb-8">
                                <Link
                                  to={`/product-details/${item?.product.id}`}
                                  className="link w-full text-line-2"
                                  tabIndex={0}
                                >
                                  {item?.product.name}
                                </Link>
                              </h6>
                              <div className="flex-align gap-16 mb-16">
                                <div className="flex-align gap-6">
                                  <span className="text-md fw-medium text-warning-600 d-flex">
                                    <i className="ph-fill ph-star" />
                                  </span>
                                  <span className="text-md fw-semibold text-gray-900">
                                    {item?.product.rating}
                                  </span>
                                </div>
                                <span className="text-sm fw-medium text-gray-200">
                                  |
                                </span>
                                <span className="text-neutral-600 w-full text-sm">
                                  128 Reviews
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-8">
                                <Link
                                  to="/cart"
                                  className="product-card__cart btn bg-gray-50 text-heading text-sm hover-bg-main-600 hover-text-white py-7 px-8 rounded-8"
                                >
                                  {item?.product.category?.name}
                                </Link>
                                <Link
                                  to="/cart"
                                  className="product-card__cart btn bg-gray-50 text-heading text-sm hover-bg-main-600 hover-text-white py-7 px-8 rounded-8"
                                >
                                  {item?.product.reference}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-lg h6 mb-0 fw-semibold">
                            ${item?.product.price}
                          </span>
                        </td>
                        <td>
                          <QuantityControl
                            value={item?.quantity ?? 1}
                            onChange={(q) =>
                              item?.id !== undefined &&
                              handleQuantityChange(item, q)
                            }
                          />
                        </td>
                        <td>
                          <span className="text-lg h6 mb-0 fw-semibold">
                            ${item?.price}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex-between flex-wrap gap-16 mt-16">
                {/* <div className="flex-align gap-16">
                  <input
                    type="text"
                    className="common-input"
                    placeholder="Coupon Code"
                  />
                  <button
                    type="submit"
                    className="btn btn-main py-18 w-100 rounded-8"
                  >
                    Apply Coupon
                  </button>
                </div> */}
                <button
                  onClick={handleClearCart}
                  type="button"
                  className="btn btn-main mt-40 py-18 rounded-8"
                >
                  Clear ShoppingCart
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4">
            <div className="cart-sidebar border border-gray-100 rounded-8 px-24 py-40">
              <h6 className="text-xl mb-32">Cart Totals</h6>
              <div className="bg-color-three rounded-8 p-24">
                <div className="mb-32 flex-between gap-8">
                  <span className="text-gray-900 font-heading-two">
                    Extimated Delivery
                  </span>
                  <span className="text-gray-900 fw-semibold">Free</span>
                </div>
                <div className="mb-0 flex-between gap-8">
                  <span className="text-gray-900 font-heading-two">
                    Extimated Taxs
                  </span>
                  <span className="text-gray-900 fw-semibold">USD 10.00</span>
                </div>
              </div>
              <div className="bg-color-three rounded-8 p-24 mt-24">
                <div className="flex-between gap-8">
                  <span className="text-gray-900 text-xl fw-semibold">
                    Total
                  </span>
                  <span className="text-gray-900 text-xl fw-semibold">
                    ${cart.totalAmount}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="btn btn-main mt-40 py-18 w-100 rounded-8"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSection;
