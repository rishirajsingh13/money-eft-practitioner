// Zero-dependency build script for Vercel and local deployments
// Directly injects .env / Vercel process.env variables into index.html

const fs = require('fs');
const path = require('path');

function loadDotEnv(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) return env;

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const match = trimmed.match(/^([\w.-]+)\s*=\s*(.*)$/);
    if (match) {
      let key = match[1];
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
  return env;
}

function parseWebinarDateRange(rawDate) {
  if (!rawDate || typeof rawDate !== 'string') return {};
  const rangeRegex = /(\d{1,2})(?:st|nd|rd|th)?\s*[-–—to]+\s*(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)(?:\s+(\d{4}))?/i;
  const match = rawDate.trim().match(rangeRegex);

  const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
  const monthAbbrs = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  if (match) {
    const d1 = parseInt(match[1], 10);
    const d2 = parseInt(match[2], 10);
    const mStr = match[3];
    const yr = match[4] ? parseInt(match[4], 10) : new Date().getFullYear();

    const mIdx = months.findIndex(m => m.startsWith(mStr.toLowerCase().slice(0, 3)));
    const monthName = mIdx !== -1 ? months[mIdx].charAt(0).toUpperCase() + months[mIdx].slice(1) : mStr;
    const monthShort = mIdx !== -1 ? monthAbbrs[mIdx].toUpperCase() : mStr.toUpperCase();

    let dow1 = '';
    let dow2 = '';
    if (mIdx !== -1) {
      dow1 = weekdays[new Date(yr, mIdx, d1).getDay()];
      dow2 = weekdays[new Date(yr, mIdx, d2).getDay()];
    }

    return {
      day1_date: dow1 ? `${d1} ${monthName} (${dow1})` : `${d1} ${monthName}`,
      day2_date: dow2 ? `${d2} ${monthName} (${dow2})` : `${d2} ${monthName}`,
      day1_badge: `${d1} ${monthShort}`,
      day2_badge: `${d2} ${monthShort}`
    };
  }

  return {
    day1_date: rawDate,
    day2_date: rawDate,
    day1_badge: rawDate,
    day2_badge: rawDate
  };
}

function getVal(env, keys, defaultVal = '') {
  for (const k of keys) {
    if (env[k] !== undefined && String(env[k]).trim() !== '') {
      return String(env[k]).trim();
    }
  }
  return defaultVal;
}

function parsePrice(val, defaultVal) {
  const str = (val !== undefined && val !== null && String(val).trim() !== '') ? String(val).trim() : defaultVal;
  const digitsOnly = str.replace(/[^0-9]/g, '');
  return {
    raw: digitsOnly || str,
    formatted: digitsOnly ? `₹${digitsOnly}` : str
  };
}

function runBuild() {
  const rootDir = __dirname;
  const envFile = path.join(rootDir, '.env');
  const fileEnv = loadDotEnv(envFile);

  // Merge process.env over fileEnv so Vercel Dashboard env vars take precedence
  const env = Object.assign({}, fileEnv, process.env);

  const webinar_date = getVal(env, ['EVENT_DATE', 'WEBINAR_DATE', 'NEXT_PUBLIC_EVENT_DATE', 'DATE'], '17–18th October');
  const webinar_time = getVal(env, ['EVENT_TIME', 'WEBINAR_TIME', 'NEXT_PUBLIC_EVENT_TIME', 'TIME'], '12–3 PM');
  const priceVal = getVal(env, ['EVENT_PRICE', 'WEBINAR_PRICE', 'NEXT_PUBLIC_EVENT_PRICE', 'PRICE'], '199');
  const originalPriceVal = getVal(env, ['EVENT_ORIGINAL_PRICE', 'ORIGINAL_PRICE', 'REGULAR_PRICE'], '999');
  const payment_url = getVal(env, ['EVENT_PAYMENT_URL', 'PAYMENT_URL', 'CTA_URL'], '');

  const dateBreakdown = parseWebinarDateRange(webinar_date);
  const day1_date = getVal(env, ['EVENT_DAY1', 'DAY1_DATE'], dateBreakdown.day1_date || '17 October (Sat)');
  const day2_date = getVal(env, ['EVENT_DAY2', 'DAY2_DATE'], dateBreakdown.day2_date || '18 October (Sun)');
  const day1_badge = dateBreakdown.day1_badge || '17 OCT';
  const day2_badge = dateBreakdown.day2_badge || '18 OCT';

  const priceObj = parsePrice(priceVal, '199');
  const origPriceObj = parsePrice(originalPriceVal, '999');

  const config = {
    webinar_date,
    webinar_time,
    day1_date,
    day2_date,
    day1_badge,
    day2_badge,
    price_raw: priceObj.raw,
    price_formatted: priceObj.formatted,
    original_price_raw: origPriceObj.raw,
    original_price_formatted: origPriceObj.formatted,
    payment_url: payment_url || undefined
  };

  const htmlPath = path.join(rootDir, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf-8');

  // Replace content inside all elements with data-webinar attributes
  html = html.replace(/(<[^>]*data-webinar="([^"]+)"[^>]*>)([\s\S]*?)(<\/[^>]+>)/gi, (match, openTag, key, oldContent, closeTag) => {
    if (config[key] !== undefined) {
      return `${openTag}${config[key]}${closeTag}`;
    }
    return match;
  });

  // Update meta & OG descriptions
  html = html.replace(/(<meta\s+name="description"\s+content=")([^"]*)(")/i, (match, prefix, content, suffix) => {
    let updated = content;
    if (config.webinar_date) updated = updated.replace(/\b\d{1,2}[–-]\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+/g, config.webinar_date);
    if (config.webinar_time) updated = updated.replace(/\b\d{1,2}(?::\d{2})?\s*[–-]\s*\d{1,2}(?::\d{2})?\s*(?:AM|PM)(?:\s*IST)?/gi, config.webinar_time);
    return `${prefix}${updated}${suffix}`;
  });

  html = html.replace(/(<meta\s+property="og:description"\s+content=")([^"]*)(")/i, (match, prefix, content, suffix) => {
    let updated = content;
    if (config.webinar_date) updated = updated.replace(/\b\d{1,2}[–-]\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+/g, config.webinar_date);
    if (config.webinar_time) updated = updated.replace(/\b\d{1,2}(?::\d{2})?\s*[–-]\s*\d{1,2}(?::\d{2})?\s*(?:AM|PM)(?:\s*IST)?/gi, config.webinar_time);
    return `${prefix}${updated}${suffix}`;
  });

  // Update CTA links if payment_url provided
  if (config.payment_url) {
    html = html.replace(/(<a\s+[^>]*data-webinar-link[^>]*\bhref=")[^"]*(")/gi, `$1${config.payment_url}$2`);
  }

  fs.writeFileSync(htmlPath, html, 'utf-8');

  // Clean up any residual config.js
  const configJsPath = path.join(rootDir, 'config.js');
  if (fs.existsSync(configJsPath)) {
    fs.unlinkSync(configJsPath);
  }

  console.log('✓ Successfully injected settings directly into index.html:');
  console.log(`  Date:           ${config.webinar_date}`);
  console.log(`  Time:           ${config.webinar_time}`);
  console.log(`  Price:          ${config.price_formatted}`);
  console.log(`  Original Price: ${config.original_price_formatted}`);
  console.log(`  Day 1:          ${config.day1_date} [${config.day1_badge}]`);
  console.log(`  Day 2:          ${config.day2_date} [${config.day2_badge}]`);
}

runBuild();
