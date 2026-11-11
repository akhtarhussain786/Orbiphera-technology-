import cron from 'node-cron'
import SeoSetting from '../models/SeoSetting.model.js'
import SeoEngine from '../services/seoEngine.js'

let activeCronTask = null

export async function initCronScheduler() {
  try {
    console.log('⏰ Initializing AI SEO Automation Cron Scheduler...')

    const setting = await SeoSetting.findOne()
    const schedule = (setting && setting.scanSchedule) ? setting.scanSchedule : '0 2 * * *'

    if (!cron.validate(schedule)) {
      console.warn(`⚠️ Invalid cron pattern: "${schedule}". Defaulting to "0 2 * * *" (02:00 AM daily).`)
    }

    const validSchedule = cron.validate(schedule) ? schedule : '0 2 * * *'

    if (activeCronTask) {
      activeCronTask.stop()
    }

    activeCronTask = cron.schedule(validSchedule, async () => {
      console.log(`\n🔔 [${new Date().toISOString()}] TRIGGERED SCHEDULED DAILY SEO SCAN (Schedule: ${validSchedule})`)
      try {
        await SeoEngine.runAuditAndOptimization({ trigger: 'daily_cron' })
        console.log('✅ Daily SEO Scan completed successfully.')
      } catch (err) {
        console.error('❌ Daily SEO Scan failed:', err.message)
      }
    })

    console.log(`✅ AI SEO Automation scheduled with cron: "${validSchedule}" (Default: 02:00 AM server time)`)
  } catch (error) {
    console.error('❌ Failed to initialize SEO cron scheduler:', error.message)
  }
}

export async function rescheduleCron(newSchedule) {
  if (!cron.validate(newSchedule)) {
    throw new Error(`Invalid cron expression format: ${newSchedule}`)
  }

  if (activeCronTask) {
    activeCronTask.stop()
  }

  activeCronTask = cron.schedule(newSchedule, async () => {
    console.log(`\n🔔 [${new Date().toISOString()}] TRIGGERED RESCHEDULED SEO SCAN (Schedule: ${newSchedule})`)
    try {
      await SeoEngine.runAuditAndOptimization({ trigger: 'daily_cron' })
    } catch (err) {
      console.error('❌ SEO Cron execution error:', err.message)
    }
  })

  console.log(`🔄 AI SEO Cron successfully rescheduled to: "${newSchedule}"`)
  return true
}

