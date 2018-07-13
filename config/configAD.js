module.exports = {
  url: 'ldap://192.168.71.10:389',
  baseDN: 'dc=IPCA,dc=LOCAL',
  username: 'dan@ipca.pt',
  username2: 'CN=Dan,CN=Users,DC=ipca,DC=local',
  password: 'Ipca2016',
  logging: {
    name: 'ActiveDirectory',
    streams: [
      { level: 'error',
        stream: process.stdout }
    ]
  }
};


