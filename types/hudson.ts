export interface HudsonResponseType {
  responseStatus: {
    message: string;
    status: string;
  };
  responseData: {
    _id: string;
    stealer: 'IN[6570B11A13B4BB85CBE8D979F8AE1EC1] [2022-04-12T21_58_55.5096687]';
    stealerFamily: string;
    dateUploaded: string;
    employeeAt: string[];
    clientAt: string[];
    dateCompromised: string;
    ip: string;
    computerName: string;
    operatingSystem: string;
    malwarePath: string;
    antiviruses: string[];
    credentials: {
      url: string;
      domain: string;
      username: string;
      password: string;
      type: string;
    }[];
  };
}

export const hudsonDummyata: HudsonResponseType = {
  responseStatus: {
    message: 'Data fetched successfully',
    status: 'success',
  },
  responseData: {
    _id: '62803407ee6a36a2b6d80bf9',
    stealer:
      'IN[6570B11A13B4BB85CBE8D979F8AE1EC1] [2022-04-12T21_58_55.5096687]',
    stealerFamily: 'RedLine',
    dateUploaded: '2022-05-14T22:58:15.806Z',
    employeeAt: [
      'freelancerweb.online',
      'hack2gather.com',
      'hostinger.com',
      'mdemoney.com',
      'msarkarjob.online',
      'scaninfoga.in',
    ],
    clientAt: [
      '192.168.32.130',
      '192.168.73.128',
      'amazon.com',
      'amazon.in',
      'appmaker.xyz',
      'bluehost.in',
      'call2friends.com',
      'cashfree.com',
      'cloudflare.com',
      'cloudron.io',
      'coinmarketcap.com',
      'crisp.chat',
      'dehashed.com',
      'digilocker.gov.in',
      'elementor.com',
      'expertoption.com',
      'facebook.com',
      'filemail.com',
      'flipkart.com',
      'fotoforensics.com',
      'freelancerweb.online',
      'github.com',
      'godaddy.com',
      'google.com',
      'hack2gather.com',
      'hackingflix.com',
      'hammer-security.ca',
      'hostinger.com',
      'hostinger.in',
      'hubspot.com',
      'impact.com',
      'indusface.com',
      'instamojo.com',
      'ip2location.com',
      'kaspersky.com',
      'live.com',
      'mailchimp.com',
      'mailpoet.com',
      'mega.nz',
      'msarkarjob.online',
      'namecheap.com',
      'nexo.io',
      'ngrok.com',
      'noip.com',
      'novopay.in',
      'onesignal.com',
      'payu.in',
      'payworldindia.com',
      'pinterest.com',
      'portmap.io',
      'profreehost.com',
      'protonmail.com',
      'razorpay.com',
      'rdserviceonline.com',
      'scaninfoga.in',
      'semrush.com',
      'shodan.io',
      'shopify.in',
      'socialcashclub.in',
      'soundcloud.com',
      'stripe.com',
      'techvansh.in',
      'tplinkwifi.net',
      'trustpulse.com',
      'tryhackme.com',
      'typeform.com',
      'unaux.com',
      'upload.ee',
      'upwork.com',
      'wisdomexpert.in',
      'woowallet.in',
      'wordpress.com',
      'wscubetech.com',
      'xecurify.com',
      'xendpay.com',
    ],
    dateCompromised: '2022-04-12T00:00:00.000Z',
    ip: '27.116.48.227',
    computerName: 'rohan',
    operatingSystem: 'Windows 10 Home x64',
    malwarePath:
      ' C:\\Windows\\Microsoft.NET\\Framework\\v4.0.30319\\AppLaunch.exe',
    antiviruses: ['Windows Defender'],
    credentials: [
      {
        url: 'https://mail.hostinger.com/',
        domain: 'hostinger.com',
        username: 'support@scaninfoga.in',
        password: '••••••••••',
        type: 'employee',
      },
      {
        url: 'https://wordpress.com/start/wpcc/oauth2-user',
        domain: 'wordpress.com',
        username: 'support@scaninfoga.in',
        password: '••••••••••',
        type: 'user',
      },
      {
        url: 'https://app.hubspot.com/login/',
        domain: 'hubspot.com',
        username: 'support@scaninfoga.in',
        password: '••••••••••',
        type: 'user',
      },
      {
        url: 'https://github.com/session',
        domain: 'github.com',
        username: 'support@scaninfoga.in',
        password: '•••••••••••••••',
        type: 'user',
      },
    ],
  },
};
