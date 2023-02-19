import TransactionRepositorie from "../repositories/transaction.repositorie";

// Find transactions by user id
describe("Find transactions by user id", () => {
  const transactionRepositorie = new TransactionRepositorie();
  let lastTransaction: any;

  beforeAll(async () => {
    await transactionRepositorie.createTransaction({
      user_id: 1,
      source_currency: "USD",
      destination_currency: "JPY",
      origin_value: "50",
      conversion_rate: "134.11504",
      date: "Sun, 19 Feb 2023 03:57:03 GMT",
    });

    lastTransaction = await transactionRepositorie.findLastTransaction();
  });

  it("should be able to find transactions by user id", async () => {
    const transactions = await transactionRepositorie.findTransactionsByUserId(
      1
    );

    expect(transactions[transactions.length - 1].id).toBe(lastTransaction.Id);
    expect(transactions[transactions.length - 1].user_id).toBe(1);
    expect(transactions[transactions.length - 1].source_currency).toBe("USD");
    expect(transactions[transactions.length - 1].destination_currency).toBe(
      "JPY"
    );
    expect(transactions[transactions.length - 1].origin_value).toBe("50");
    expect(transactions[transactions.length - 1].conversion_rate).toBe(
      "134.11504"
    );
    expect(transactions[transactions.length - 1].date).toBe(
      "Sun, 19 Feb 2023 03:57:03 GMT"
    );
  });

  it("should be able to show user id invalid error", async () => {
    await expect(() =>
      transactionRepositorie.findTransactionsByUserId(0)
    ).rejects.toEqual({
      status: 400,
      message: "User Id invalid!",
    });
  });

  it("should be able to show transactions not found error", async () => {
    await expect(() =>
      transactionRepositorie.findTransactionsByUserId(99558)
    ).rejects.toEqual({
      status: 404,
      message: "Transactions not found!",
    });
  });
});

// Find transaction by id
describe("Find transaction by id", () => {
  const transactionRepositorie = new TransactionRepositorie();
  let lastTransaction: any;

  beforeAll(async () => {
    await transactionRepositorie.createTransaction({
      user_id: 1,
      source_currency: "USD",
      destination_currency: "EUR",
      origin_value: "50",
      conversion_rate: "0.932804",
      date: "Sun, 19 Feb 2023 03:57:03 GMT",
    });

    lastTransaction = await transactionRepositorie.findLastTransaction();
  });

  it("should be able to find transaction by id", async () => {
    const transaction = await transactionRepositorie.findTransactionById(
      lastTransaction.Id
    );

    expect(transaction.id).toBe(lastTransaction.Id);
    expect(transaction.user_id).toBe(1);
    expect(transaction.source_currency).toBe("USD");
    expect(transaction.destination_currency).toBe("EUR");
    expect(transaction.origin_value).toBe("50");
    expect(transaction.conversion_rate).toBe("0.932804");
    expect(transaction.date).toBe("Sun, 19 Feb 2023 03:57:03 GMT");
  });

  it("should be able to show id invalid error", async () => {
    await expect(() =>
      transactionRepositorie.findTransactionById(0)
    ).rejects.toEqual({
      status: 400,
      message: "Id invalid!",
    });
  });

  it("should be able to show transaction not found error", async () => {
    await expect(() =>
      transactionRepositorie.findTransactionById(99558)
    ).rejects.toEqual({
      status: 404,
      message: "Transaction not found!",
    });
  });
});

// Find id of last created transaction
describe("Find id of last created transaction", () => {
  const transactionRepositorie = new TransactionRepositorie();
  let lastTransaction: any;

  beforeAll(async () => {
    await transactionRepositorie.createTransaction({
      user_id: 1,
      source_currency: "USD",
      destination_currency: "EUR",
      origin_value: "50",
      conversion_rate: "0.932804",
      date: "Sun, 19 Feb 2023 03:57:03 GMT",
    });

    lastTransaction = await transactionRepositorie.findLastTransaction();
  });

  it("should be able to find id of last created transaction", async () => {
    const transaction = await transactionRepositorie.findLastTransaction();

    expect(transaction.Id).toBe(lastTransaction.Id);
  });
});

// Create transaction
describe("Create transaction", () => {
  const transactionRepositorie = new TransactionRepositorie();

  it("should be able to create transaction", async () => {
    const transaction = await transactionRepositorie.createTransaction({
      user_id: 1,
      source_currency: "USD",
      destination_currency: "JPY",
      origin_value: "50",
      conversion_rate: "134.11504",
      date: "Sun, 19 Feb 2023 03:57:03 GMT",
    });

    expect(transaction.length).toBe(0);
  });

  it("should be able to show invalid user id error", async () => {
    await expect(() =>
      transactionRepositorie.createTransaction({
        user_id: 0,
        source_currency: "USD",
        destination_currency: "JPY",
        origin_value: "50",
        conversion_rate: "134.11504",
        date: "Sun, 19 Feb 2023 03:57:03 GMT",
      })
    ).rejects.toEqual({ status: 400, message: "User Id invalid!" });
  });

  it("should be able to show source currency not informed error", async () => {
    await expect(() =>
      transactionRepositorie.createTransaction({
        user_id: 1,
        source_currency: "",
        destination_currency: "JPY",
        origin_value: "50",
        conversion_rate: "134.11504",
        date: "Sun, 19 Feb 2023 03:57:03 GMT",
      })
    ).rejects.toEqual({
      status: 400,
      message: "Source Currency was not informed!",
    });
  });

  it("should be able to show destination currency not informed error", async () => {
    await expect(() =>
      transactionRepositorie.createTransaction({
        user_id: 1,
        source_currency: "USD",
        destination_currency: "",
        origin_value: "50",
        conversion_rate: "134.11504",
        date: "Sun, 19 Feb 2023 03:57:03 GMT",
      })
    ).rejects.toEqual({
      status: 400,
      message: "Destination Currency was not informed!",
    });
  });

  it("should be able to show origin value not informed error", async () => {
    await expect(() =>
      transactionRepositorie.createTransaction({
        user_id: 1,
        source_currency: "USD",
        destination_currency: "JYP",
        origin_value: "",
        conversion_rate: "134.11504",
        date: "Sun, 19 Feb 2023 03:57:03 GMT",
      })
    ).rejects.toEqual({
      status: 400,
      message: "Origin Value was not informed!",
    });
  });

  it("should be able to show conversation rate not informed error", async () => {
    await expect(() =>
      transactionRepositorie.createTransaction({
        user_id: 1,
        source_currency: "USD",
        destination_currency: "JYP",
        origin_value: "50",
        conversion_rate: "",
        date: "Sun, 19 Feb 2023 03:57:03 GMT",
      })
    ).rejects.toEqual({
      status: 400,
      message: "Conversion Rate was not informed!",
    });
  });

  it("should be able to show date not informed error", async () => {
    await expect(() =>
      transactionRepositorie.createTransaction({
        user_id: 1,
        source_currency: "USD",
        destination_currency: "JYP",
        origin_value: "50",
        conversion_rate: "134.11504",
        date: "",
      })
    ).rejects.toEqual({
      status: 400,
      message: "Date was not informed!",
    });
  });
});
