/// null = 未请求，1 = 已允许，0 = 拒绝|受限, 2 = 系统未开启

let isIOS

function album () {
  let result = 0
  const PHPhotoLibrary = plus.ios.import('PHPhotoLibrary')
  const authStatus = PHPhotoLibrary.authorizationStatus()
  if (authStatus === 0) {
    result = null
  } else if (authStatus == 3) {
    result = 1
  } else {
    result = 0
  }
  plus.ios.deleteObject(PHPhotoLibrary)
  return result
}

function camera () {
  let result = 0
  const AVCaptureDevice = plus.ios.import('AVCaptureDevice')
  const authStatus = AVCaptureDevice.authorizationStatusForMediaType('vide')
  if (authStatus === 0) {
    result = null
  } else if (authStatus == 3) {
    result = 1
  } else {
    result = 0
  }
  plus.ios.deleteObject(AVCaptureDevice)
  return result
}

function location () {
  let result = 0
  const cllocationManger = plus.ios.import('CLLocationManager')
  const enable = cllocationManger.locationServicesEnabled()
  const status = cllocationManger.authorizationStatus()
  if (!enable) {
    result = 2
  } else if (status === 0) {
    result = null
  } else if (status === 3 || status === 4) {
    result = 1
  } else {
    result = 0
  }
  plus.ios.deleteObject(cllocationManger)
  return result
}

function push () {
  let result = 0
  const UIApplication = plus.ios.import('UIApplication')
  const app = UIApplication.sharedApplication()
  let enabledTypes = 0
  if (app.currentUserNotificationSettings) {
    const settings = app.currentUserNotificationSettings()
    enabledTypes = settings.plusGetAttribute('types')
    if (enabledTypes == 0) {
      result = 0
      console.log('推送权限没有开启')
    } else {
      result = 1
      console.log('已经开启推送功能!')
    }
    plus.ios.deleteObject(settings)
  } else {
    enabledTypes = app.enabledRemoteNotificationTypes()
    if (enabledTypes == 0) {
      result = 3
      console.log('推送权限没有开启!')
    } else {
      result = 4
      console.log('已经开启推送功能!')
    }
  }
  plus.ios.deleteObject(app)
  plus.ios.deleteObject(UIApplication)
  return result
}

function contact () {
  let result = 0
  const CNContactStore = plus.ios.import('CNContactStore')
  const cnAuthStatus = CNContactStore.authorizationStatusForEntityType(0)
  if (cnAuthStatus === 0) {
    result = null
  } else if (cnAuthStatus == 3) {
    result = 1
  } else {
    result = 0
  }
  plus.ios.deleteObject(CNContactStore)
  return result
}

function record () {
  let result = null
  const avaudiosession = plus.ios.import('AVAudioSession')
  const avaudio = avaudiosession.sharedInstance()
  const status = avaudio.recordPermission()
  console.log('permissionStatus:' + status)
  if (status === 1970168948) {
    result = null
  } else if (status === 1735552628) {
    result = 1
  } else {
    result = 0
  }
  plus.ios.deleteObject(avaudiosession)
  return result
}

function calendar () {
  let result = null
  const EKEventStore = plus.ios.import('EKEventStore')
  const ekAuthStatus = EKEventStore.authorizationStatusForEntityType(0)
  if (ekAuthStatus == 3) {
    result = 1
    console.log('日历权限已经开启')
  } else {
    console.log('日历权限没有开启')
  }
  plus.ios.deleteObject(EKEventStore)
  return result
}

function memo () {
  let result = null
  const EKEventStore = plus.ios.import('EKEventStore')
  const ekAuthStatus = EKEventStore.authorizationStatusForEntityType(1)
  if (ekAuthStatus == 3) {
    result = 1
    console.log('备忘录权限已经开启')
  } else {
    console.log('备忘录权限没有开启')
  }
  plus.ios.deleteObject(EKEventStore)
  return result
}

function requestIOS (permissionID) {
  return new Promise((resolve, reject) => {
    switch (permissionID) {
    case 'push':
      resolve(push())
      break
    case 'location':
      resolve(location())
      break
    case 'record':
      resolve(record())
      break
    case 'camera':
      resolve(camera())
      break
    case 'album':
      resolve(album())
      break
    case 'contact':
      resolve(contact())
      break
    case 'calendar':
      resolve(calendar())
      break
    case 'memo':
      resolve(memo())
      break
    default:
      resolve(0)
      break
    }
  })
}

function requestAndroid (permissionID) {
  return new Promise((resolve, reject) => {
    plus.android.requestPermissions(
      [permissionID],
      function (resultObj) {
        let result = 0
        for (var i = 0; i < resultObj.granted.length; i++) {
          const grantedPermission = resultObj.granted[i]
          console.log('已获取的权限：' + grantedPermission)
          result = 1
        }
        for (var i = 0; i < resultObj.deniedPresent.length; i++) {
          const deniedPresentPermission = resultObj.deniedPresent[i]
          console.log('拒绝本次申请的权限：' + deniedPresentPermission)
          result = 0
        }
        for (var i = 0; i < resultObj.deniedAlways.length; i++) {
          const deniedAlwaysPermission = resultObj.deniedAlways[i]
          console.log('永久拒绝申请的权限：' + deniedAlwaysPermission)
          result = -1
        }
        resolve(result)
      },
      function (error) {
        console.log('result error: ' + error.message)
        resolve({
          code: error.code,
          message: error.message
        })
      }
    )
  })
}

function gotoAppPermissionSetting () {
  if (permission.isIOS) {
    const UIApplication = plus.ios.import('UIApplication')
    const application2 = UIApplication.sharedApplication()
    const NSURL2 = plus.ios.import('NSURL')
    const setting2 = NSURL2.URLWithString('app-settings:')
    application2.openURL(setting2)
    plus.ios.deleteObject(setting2)
    plus.ios.deleteObject(NSURL2)
    plus.ios.deleteObject(application2)
  } else {
    const Intent = plus.android.importClass('android.content.Intent')
    const Settings = plus.android.importClass('android.provider.Settings')
    const Uri = plus.android.importClass('android.net.Uri')
    const mainActivity = plus.android.runtimeMainActivity()
    const intent = new Intent()
    intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
    const uri = Uri.fromParts('package', mainActivity.getPackageName(), null)
    intent.setData(uri)
    mainActivity.startActivity(intent)
  }
}

const permission = {
  get isIOS () {
    return typeof isIOS === 'boolean' ? isIOS : (isIOS = uni.getSystemInfoSync().platform === 'ios')
  },
  requestIOS,
  requestAndroid,
  gotoAppSetting: gotoAppPermissionSetting
}

export default permission
