import classNames from "classnames";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ProductsEntity } from "src/mocked_data/shopResponse";
import Button from "../Button/Button";
import ShopHeader from "../ShopHeader/ShopHeader";
import ShopItem from "../ShopItem/ShopItem";
import pagination from "../../helpers/pagination";
import "./ShopBox.scss";

interface ShopBoxInterface {
  closeShop: () => void;
  isShopOpen: boolean;
  productsByCategorie: ProductsEntity[];
  products: ProductsEntity[];
  title: string;
  image: string;
  hasRobBadge?: boolean;
}

interface SelectedItem {
  ID: number;
  variant: number;
}

export type PaymentType = "cash" | "card";

const ShopBox: React.FC<ShopBoxInterface> = ({
  title,
  image,
  hasRobBadge,
  children,
  isShopOpen = false,
  productsByCategorie,
  products,
  closeShop,
}) => {
  const [price, setPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>();
  const [paymentType, setPaymentType] = useState<PaymentType>("cash");
  const [responseBuyProduct, setResponseBuyProduct] = useState(false);
  const [isProcessing, setisProcessing] = useState(false);
  const [productToBuy, setProductToBuy] = useState(true);

  const addItemToCart = (item: ProductsEntity, currentVariant: number) => {
    setSelectedItems((oldState) => [
      ...(oldState ?? []),
      {
        ID: item.ID,
        variant: currentVariant,
      },
    ]);
    setPrice((oldState) => oldState + item.Price);
  };

  const removeItemFromCart = (item: ProductsEntity, currentVariant: number) => {
    console.log(currentVariant);
    setSelectedItems(
      (selectedItems ?? []).filter((selItem) => selItem.ID !== item.ID)
    );
  };

  useLayoutEffect(() => {
    EventManager.on(
      "responseBuyProduct",
      (success: boolean, errorMsg: string) => {
        console.log("can user buy product ", success);
        setResponseBuyProduct(success);
        errorMsg && console.error(errorMsg);
        setisProcessing(false);
      }
    );
  }, []);

  const buyProduct = (item: ProductsEntity, selectedItem: SelectedItem) => {
    setisProcessing(true);
    mp.trigger(
      "buyProduct",
      selectedItem.ID,
      selectedItem.variant,
      paymentType
    );

    for (let idx; (idx = 0); idx++) {
      if (idx === 2500) {
        console.log("i quited because of idx over 2500");

        break;
      }

      if (!isProcessing) {
        if (responseBuyProduct) {
          console.log("i bougth ", item.Name);
          removeItemFromCart(item, selectedItem.variant);
        } else {
          console.log("i cant buy product because of ", responseBuyProduct);
        }
      }
    }
  };

  return (
    <div
      className={classNames("shop-box-wrapper", { ["shop-open"]: isShopOpen })}
    >
      <ShopHeader
        title={title}
        image={image}
        closeShop={closeShop}
        hasRobBadge={hasRobBadge}
      />
      <div className="shop-box">
        {children}

        <div className="shop-box-item-list">
          <table>
            <tbody>
              {(productsByCategorie.length
                ? productsByCategorie
                : products
              ).map((item: ProductsEntity) => {
                return (
                  <ShopItem
                    key={item.ID}
                    item={item}
                    nextVariant={pagination.nextVariant}
                    previousVariant={pagination.previousVariant}
                    removeItemFromCart={removeItemFromCart}
                    addItemToCart={addItemToCart}
                  />
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="shop-box-footer">
          <div className="shop-box-payment">
            <div>
              <Button
                onClick={() => setPaymentType("cash")}
                inverted={paymentType !== "cash"}
                text="Bar"
                type="button"
                halfWidth
              />
              <Button
                onClick={() => setPaymentType("card")}
                inverted={paymentType !== "card"}
                text="Karte"
                type="button"
                halfWidth
              />
            </div>
            <Button
              onClick={() => {
                (selectedItems ?? []).forEach((item) => {
                  const productItem = (productsByCategorie.length
                    ? productsByCategorie
                    : products
                  ).filter((product) => product.ID === item.ID);
                  buyProduct(productItem[0], item);
                });
              }}
              text="Bezahlen"
              type="submit"
              variant="big"
            />
            <Button
              onClick={() => {
                setSelectedItems([]);
                setPrice(0);
              }}
              variant="small"
              text="Warenkorb Leeren"
              type="reset"
            />
          </div>
          <div className="shop-box-order">
            <h4 className="shop-box-order-headline">Quittung</h4>
            <hr />
            <div>
              {(selectedItems ?? []).map((selItem) => {
                const productData = products.find(
                  (product) => product.ID === selItem.ID
                );

                return (
                  <div key={`${productData?.Name} - ${selItem.variant}`}>
                    {productData?.Name} - {selItem.variant}
                  </div>
                );
              })}
            </div>
            <p className="shop-box-order-info">
              Zahlungsart: {paymentType === "card" ? "Karte" : "Bar"} Gesammt: $
              {price.toString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBox;
