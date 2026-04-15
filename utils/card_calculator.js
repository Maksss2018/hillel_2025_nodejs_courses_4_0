import generatePassword from "generate-password";
export default (receivedData) => {
  const articul = generatePassword.generate({
    length: 8,
    numbers: true,
  });

  const cardData = {
    articul: articul,
    action: "cart",
    total_amount: 0,
    total_sum: 0,
    goods: [],
  };

  const responsData = Object.entries(receivedData).reduce((acc, item) => {
    if (!acc.goods.some((goodsItem) => goodsItem === item[0])) {
      acc.goods.push(item[0]);
    }
    acc.total_sum = acc.total_sum + item[1].price * item[1].amount;
    acc.total_amount = acc.total_amount + item[1].amount;
    return acc;
  }, cardData);
  return responsData;
};
