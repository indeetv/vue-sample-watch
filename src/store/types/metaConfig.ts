export interface Endpoints {
    'watch.meta.product.retrieve' : string
    'watch.meta.feature_support' : string
    'watch.auth.session.login' : string
    'watch.auth.session.refresh' : string
    'watch.auth.session.logout' : string
    'watch.auth.session.qr.get_login_code' : string
    'watch.auth.session.qr.login' : string
    'watch.auth.session.qr.get_token' : string
    'watch.auth.password.forgot_password' : string
    'watch.auth.password.reset_password' : string
    'watch.content.brand.list' : string
    'watch.content.project.list' : string
    'watch.content.genre.list' : string
    'watch.content.carousel_image.list' : string
    'watch.content.videos.list' : string
    'watch.content.project.retrieve' : string
    'watch.content.video.retrieve' : string
    'watch.content.screener.2fa' : string
    'watch.content.watchlist_project.add' : string
    'watch.content.watchlist_project.list' : string
    'watch.content.watchlist_project.delete' : string
    'watch.stream.session.playback' : string
    'watch.stream.view_engagement.record' : string
    'watch.content.swimlane.list' : string
    'watch.content.swimlane.project.list' : string
  }
  
  export interface Host {
    name : string
  }
  
  export interface MetaResponse {
    endpoints : Endpoints
    host : Host
  }
  