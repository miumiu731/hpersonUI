/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {}

  // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = 'http://localhost:8888/h-person'
  //window.SITE_CONFIG['baseUrl'] = 'http://106.12.16.45/h-person'

  // cdn地址 = 域名 + 版本号
  //window.SITE_CONFIG['domain'] = './' // 域名
  window.SITE_CONFIG['domain'] = '' // 域名
  window.SITE_CONFIG['version'] = ''   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version
})()
