/**
 * 英语
 */
export default {
  route: {
    dashboard: {
      _name: 'Dashboard',
      workplace: {_name: 'Workplace'},
      analysis: {_name: 'Analysis'},
      monitor: {_name: 'Monitor'}
    },
    system: {
      _name: 'System',
      user: {
        _name: 'User',
        info: {_name: ''}
      },
      role: {_name: 'Role'},
      menu: {_name: 'Menu'},
      dictionary: {_name: 'Dictionary'},
      organization: {_name: 'Organization'},
      loginRecord: {_name: 'Login Record'},
      operRecord: {_name: 'Operation Log'}
    },
    exception: {
      _name: 'Exception',
      '403': {_name: '403'},
      '404': {_name: '404'},
      '500': {_name: '500'}
    },
    user: {
      _name: 'User',
      profile: {_name: 'Profile'},
    },
    example: {
      _name: 'Example',
      document: {_name: 'Document'},
      choose: {_name: 'Choose'},
    },
    'https://www.rxthink.cn/goods/detail/7': {_name: 'Authorization'}
  },
  layout: {
    home: 'Home',
    header: {
      profile: 'Profile',
      password: 'Password',
      logout: 'SignOut'
    },
    footer: {

      copyright: 'Copyright © pengking'
    },
    logout: {
      title: 'Confirm',
      message: 'Are you sure you want to logout?'
    }
  },
  login: {
    title: 'pengking',
    username: 'please input username',
    password: 'please input password',
    captcha: 'please input captcha',
    remember: 'remember',
    forget: 'forget',
    login: 'login',
    loading: 'loading'
  }
}
