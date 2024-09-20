import Web3Component from './web3';
import { checkLoadTime } from './utils';

describe('Web3 Component', () => {
  const labels = [
    'createTime',
    'getBlockTime',
    'getBalanceTime',
    'getGasPriceTime',
    'createAccountTime',
    'getChainIdTime',
    'getSignatureTime',
  ];
  
  const totalIterations = 5;
  const averages: Record<string, number[]> = {
    createTime: [],
    // getBlockTime: [],
    // getBalanceTime: [],
    // getGasPriceTime: [],
    createAccountTime: [],
    // getChainIdTime: [],
    getSignatureTime: [],
  };

  for (let i = 0; i < totalIterations; i++) {
    it(`Measure load time - Iteration ${i + 1}`, () => {
      cy.mount(<Web3Component />);
      
      cy.window().then(() => {
        cy.get('[data-cy="web3-create-time"]').as(labels[0]);
        // cy.get('[data-cy="web3-getblock-time"]').as(labels[1]);
        // cy.get('[data-cy="web3-getBalance-time"]').as(labels[2]);
        // cy.get('[data-cy="web3-getGasprice-time"]').as(labels[3]);
        cy.get('[data-cy="web3-createAccount-time"]').as(labels[4]);
        // cy.get('[data-cy="web3-getChainId-time"]').as(labels[5]);
        cy.get('[data-cy="web3-getSignature-time"]').as(labels[6]);
        // Check and accumulate times
        checkLoadTime('@createTime', 'Web3 Create Time').then((time) => averages['createTime'].push(time));
        // checkLoadTime('@getBlockTime', 'Web3 get Block Time').then((time) => averages['getBlockTime'].push(time));
        // checkLoadTime('@getBalanceTime', 'Web3 get Balance Time').then((time) => averages['getBalanceTime'].push(time));
        // checkLoadTime('@getGasPriceTime', 'Web3 get Gas Price Time').then((time) => averages['getGasPriceTime'].push(time));
        checkLoadTime('@createAccountTime', 'Web3 create Account Time').then((time) => averages['createAccountTime'].push(time));
        // checkLoadTime('@getChainIdTime', 'Web3 get ChainId Time').then((time) => averages['getChainIdTime'].push(time));
        checkLoadTime('@getSignatureTime', 'Web3 get Signature Time').then((time) => averages['getSignatureTime'].push(time));
      });
    });
  }

  after(() => {
    cy.task('log', `Web3.js Component ${totalIterations} iterations`);
    Object.keys(averages).forEach((key) => {
      const total = averages[key].reduce((acc, cur) => acc + cur, 0);
      const average = total / totalIterations;
      cy.task('log', `${key} - Average load time: ${average.toFixed(2)}ms`);
    });
  });
});
