import crypto from 'crypto'
import VisitorMetric from '../models/VisitorMetric.model.js'

export const trackVisitor = async (req, res, next) => {
  // Only track GET page requests and public API visits, skip admin, health checks, static assets
  if (req.method !== 'GET') return next()
  if (req.path.startsWith('/api/admin') || req.path.startsWith('/uploads') || req.path === '/api/health') {
    return next()
  }

  // Non-blocking asynchronous visitor recording
  setImmediate(async () => {
    try {
      const today = new Date().toISOString().slice(0, 10)
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1'
      const ipHash = crypto.createHash('sha256').update(ip + today).digest('hex').slice(0, 16)

      const userAgent = req.headers['user-agent'] || ''
      const isMobile = /mobile|android|iphone|ipad/i.test(userAgent)
      const isTablet = /tablet|ipad/i.test(userAgent)

      let metric = await VisitorMetric.findOne({ date: today })
      if (!metric) {
        metric = new VisitorMetric({
          date: today,
          pageViews: 1,
          uniqueVisitors: 1,
          ipHashes: [ipHash],
          pathCounts: new Map([[req.path, 1]]),
          deviceCounts: {
            desktop: (!isMobile && !isTablet) ? 1 : 0,
            mobile: isMobile ? 1 : 0,
            tablet: isTablet ? 1 : 0
          }
        })
        await metric.save()
      } else {
        const isNewVisitor = !metric.ipHashes.includes(ipHash)
        const updateDoc = {
          $inc: {
            pageViews: 1,
            ...(isNewVisitor ? { uniqueVisitors: 1 } : {}),
            ...((!isMobile && !isTablet) ? { 'deviceCounts.desktop': 1 } : {}),
            ...(isMobile ? { 'deviceCounts.mobile': 1 } : {}),
            ...(isTablet ? { 'deviceCounts.tablet': 1 } : {})
          }
        }
        if (isNewVisitor) {
          updateDoc.$push = { ipHashes: ipHash }
        }

        await VisitorMetric.updateOne({ date: today }, updateDoc)
      }
    } catch (e) {
      // Never crash requests on metrics recording
    }
  })

  next()
}

