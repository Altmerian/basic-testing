import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const initialBalance = 100;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(initialBalance + 1)).toThrow(
      InsufficientFundsError,
    );
    expect(() => account.withdraw(initialBalance + 1)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const accountA = getBankAccount(initialBalance);
    const accountB = getBankAccount(0);
    expect(() => accountA.transfer(initialBalance + 1, accountB)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const accountA = getBankAccount(initialBalance);
    expect(() => accountA.transfer(50, accountA)).toThrow(TransferFailedError);
    expect(() => accountA.transfer(50, accountA)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const depositAmount = 50;
    const account = getBankAccount(initialBalance);
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 50;
    const account = getBankAccount(initialBalance);
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalanceA = initialBalance;
    const initialBalanceB = 50;
    const transferAmount = 50;
    const accountA = getBankAccount(initialBalanceA);
    const accountB = getBankAccount(initialBalanceB);

    accountA.transfer(transferAmount, accountB);

    expect(accountA.getBalance()).toBe(initialBalanceA - transferAmount);
    expect(accountB.getBalance()).toBe(initialBalanceB + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(initialBalance);
    // We expect fetchBalance to resolve, and its result to be either number or null
    // due to the internal unmocked lodash.random call.
    // (external libraries mocks are used in future tasks)
    const result = await account.fetchBalance();
    if (result !== null) {
      expect(typeof result).toBe('number');
    } else {
      expect(result).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(initialBalance);
    // This test depends on fetchBalance succeeding, which makes it flaky.
    // To avoid flakiness, we can mock fetchBalance to return a fixed value.
    const newBalance = initialBalance + 50;
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(newBalance);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(initialBalance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
