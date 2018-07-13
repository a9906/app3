'use strict'

const ldapjs = require('ldapjs');
//const ldapConfig = require('./config');
const Promise = require('promise');

const ldapOptions = {
    url: "ldap://192.168.71.10:389",
    connectTimeout: 30000,
    reconnect: true
}

let addUser = (userId, givenName, familyName, password) => {
    return new Promise((resolve, reject) => {
  
      // 1
      const ldapClient = ldapjs.createClient(ldapOptions);
  
      // 2
      ldapClient.bind(
        ldapConfig.pwdUser,
        ldapConfig.pwdUserPassword,
        (err) => {
  
          if (err) return reject(err);
  
          let newUser = {
            givenName: 'none',
            uid: userId,
            givenName: givenName,
            familyName: familyName,
            cn: userId,
            userPassword: password,
            objectClass: ["person", "organizationalPerson", "inetOrgPerson"],
            pwdPolicySubentry: ldapConfig.pwdPolicySubentry
          };
  
          // 3
          ldapClient.add(
            'cn=' + userId + ',' + ldapConfig.domain,
            newUser,
            (err, response) => {
              if (err) return reject(err);
              return resolve(response);
            }
          );
        }
      );
    });
  }


  let authenticate = (userId, password) => {
    return new Promise ((resolve, reject) => {
      const ldapClient = ldapjs.createClient(ldapOptions);
  
      ldapClient.bind(
        'cn=' + userId + ',' + ldapConfig.domain,
        password,
        (err, res) => {
          if (err) {
            //@see https://github.com/mcavage/node-ldapjs/blob/7059cf6b8a0b4ff4c566714d97f3cef04f887c3b/test/client.test.js @ 305
            return reject(err);
          }
          ldapClient.unbind();
          return resolve(res);
        }
      );
    });
  };



let changePassword = (userId, passwordOld, passwordNew) => {
    return new Promise( (resolve, reject) => {
  
      const ldapClient = ldapjs.createClient(ldapOptions);
  
      // 1
      ldapClient.bind(
        'cn=' + userId + ',' + ldapConfig.domain,
        passwordOld,
        err => {
          if (err) return reject(err);
  
          // 2
          ldapClient.modify(getDomainString(userId),
            [
              new ldapjs.Change({
                operation: 'replace',
                modification: {
                  userPassword: passwordNew
                }
              })
            ],
            (err) => {
              if (err) reject(err);
              return resolve(true);
            }
          );
        }
      );

    });
  }