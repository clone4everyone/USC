interface GoogleCalendarEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  location?: string;
}

// Parse iCal format (improved parser)
const parseICal = (icalData: string): GoogleCalendarEvent[] => {
  const events: GoogleCalendarEvent[] = [];
  const lines = icalData.split(/\r?\n/);
  
  let currentEvent: Partial<GoogleCalendarEvent> | null = null;
  let currentField: string | null = null;
  let currentValue: string = '';
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Handle line continuation (lines starting with space)
    if (line.startsWith(' ') && currentField) {
      currentValue += line.substring(1);
      continue;
    }
    
    // Save previous field value
    if (currentField && currentEvent) {
      const value = currentValue.trim();
      if (value) {
        if (currentField === 'UID') {
          currentEvent.id = value;
        } else if (currentField === 'SUMMARY') {
          currentEvent.title = value.replace(/\\n/g, '\n').replace(/\\,/g, ',').replace(/\\;/g, ';');
        } else if (currentField === 'DESCRIPTION') {
          let desc = value;
          // First, decode iCal escaping
          desc = desc.replace(/\\n/g, '\n').replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\\\/g, '\\');
          
          // Strip HTML tags from description but preserve structure
          // Replace list items with line breaks BEFORE removing tags
          desc = desc.replace(/<\/li>/gi, '\n').replace(/<\/p>/gi, '\n\n').replace(/<\/div>/gi, '\n').replace(/<\/h[1-6]>/gi, '\n\n');
          desc = desc.replace(/<li[^>]*>/gi, '• ').replace(/<p[^>]*>/gi, '').replace(/<div[^>]*>/gi, '').replace(/<h[1-6][^>]*>/gi, '');
          desc = desc.replace(/<[^>]*>/g, ''); // Remove remaining HTML tags
          
          // Decode HTML entities BEFORE cleaning whitespace (to preserve emojis)
          const textarea = document.createElement('textarea');
          textarea.innerHTML = desc;
          desc = textarea.value || desc;
          
          // Clean up multiple line breaks (but preserve single line breaks)
          desc = desc.replace(/\n{3,}/g, '\n\n');
          // Remove trailing special characters but preserve emojis
          desc = desc.replace(/[Â\u00A0]+/g, ' ').trim();
          // Clean up any remaining encoding issues (but not emojis)
          desc = desc.replace(/\u00C2\u00A0/g, ' ').replace(/\u00A0/g, ' ').trim();
          
          currentEvent.description = desc;
        } else if (currentField === 'LOCATION') {
          currentEvent.location = value.replace(/\\n/g, '\n').replace(/\\,/g, ',').replace(/\\;/g, ';');
        } else if (currentField === 'DTSTART') {
          // Handle both VALUE=DATE:20251125 and regular datetime formats
          let dateStr = value;
          // If value contains colon, extract the part after the last colon
          if (value.includes(':')) {
            const parts = value.split(':');
            dateStr = parts[parts.length - 1];
          }
          currentEvent.startDate = parseICalDate(dateStr);
        } else if (currentField === 'DTEND') {
          // Handle both VALUE=DATE:20251128 and regular datetime formats
          let dateStr = value;
          // If value contains colon, extract the part after the last colon
          if (value.includes(':')) {
            const parts = value.split(':');
            dateStr = parts[parts.length - 1];
          }
          const endDate = parseICalDate(dateStr);
          // iCal DTEND is EXCLUSIVE - it represents the day AFTER the event ends
          // So if DTEND is 20251123, the event actually ends on 20251122
          // Subtract 1 day to get the actual last day of the event
          endDate.setDate(endDate.getDate() - 1);
          currentEvent.endDate = endDate;
        }
      }
      currentValue = '';
    }
    
    line = line.trim();
    
    if (line === 'BEGIN:VEVENT') {
      currentEvent = {};
      currentField = null;
    } else if (line === 'END:VEVENT' && currentEvent) {
      // Save last field
      if (currentField && currentValue.trim()) {
        const value = currentValue.trim();
        if (currentField === 'UID') {
          currentEvent.id = value;
        } else if (currentField === 'SUMMARY') {
          currentEvent.title = value.replace(/\\n/g, '\n').replace(/\\,/g, ',').replace(/\\;/g, ';');
        } else if (currentField === 'DESCRIPTION') {
          let desc = value;
          // First, decode iCal escaping
          desc = desc.replace(/\\n/g, '\n').replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\\\/g, '\\');
          
          // Strip HTML tags from description but preserve structure
          // Replace list items with line breaks BEFORE removing tags
          desc = desc.replace(/<\/li>/gi, '\n').replace(/<\/p>/gi, '\n\n').replace(/<\/div>/gi, '\n').replace(/<\/h[1-6]>/gi, '\n\n');
          desc = desc.replace(/<li[^>]*>/gi, '• ').replace(/<p[^>]*>/gi, '').replace(/<div[^>]*>/gi, '').replace(/<h[1-6][^>]*>/gi, '');
          desc = desc.replace(/<[^>]*>/g, ''); // Remove remaining HTML tags
          
          // Decode HTML entities BEFORE cleaning whitespace (to preserve emojis)
          const textarea = document.createElement('textarea');
          textarea.innerHTML = desc;
          desc = textarea.value || desc;
          
          // Clean up multiple line breaks (but preserve single line breaks)
          desc = desc.replace(/\n{3,}/g, '\n\n');
          // Remove trailing special characters but preserve emojis
          desc = desc.replace(/[Â\u00A0]+/g, ' ').trim();
          // Clean up any remaining encoding issues (but not emojis)
          desc = desc.replace(/\u00C2\u00A0/g, ' ').replace(/\u00A0/g, ' ').trim();
          
          currentEvent.description = desc;
        } else if (currentField === 'LOCATION') {
          currentEvent.location = value.replace(/\\n/g, '\n').replace(/\\,/g, ',').replace(/\\;/g, ';');
        } else if (currentField === 'DTSTART') {
          // Handle both VALUE=DATE:20251125 and regular datetime formats
          let dateStr = value;
          // If value contains colon, extract the part after the last colon
          if (value.includes(':')) {
            const parts = value.split(':');
            dateStr = parts[parts.length - 1];
          }
          currentEvent.startDate = parseICalDate(dateStr);
        } else if (currentField === 'DTEND') {
          // Handle both VALUE=DATE:20251128 and regular datetime formats
          let dateStr = value;
          // If value contains colon, extract the part after the last colon
          if (value.includes(':')) {
            const parts = value.split(':');
            dateStr = parts[parts.length - 1];
          }
          const endDate = parseICalDate(dateStr);
          // iCal DTEND is EXCLUSIVE - it represents the day AFTER the event ends
          // So if DTEND is 20251123, the event actually ends on 20251122
          // Subtract 1 day to get the actual last day of the event
          endDate.setDate(endDate.getDate() - 1);
          currentEvent.endDate = endDate;
        }
      }
      
      if (currentEvent.id && currentEvent.title && currentEvent.startDate && currentEvent.endDate) {
        events.push({
          id: currentEvent.id,
          title: currentEvent.title,
          startDate: currentEvent.startDate,
          endDate: currentEvent.endDate,
          description: currentEvent.description,
          location: currentEvent.location,
        });
      }
      currentEvent = null;
      currentField = null;
      currentValue = '';
    } else if (currentEvent) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const beforeColon = line.substring(0, colonIndex);
        const fieldName = beforeColon.split(';')[0]; // Get field name without parameters
        const fieldValue = line.substring(colonIndex + 1);
        
        // Handle fields that may have parameters like DTSTART;VALUE=DATE:20251125
        // For DTSTART;VALUE=DATE:20251125:
        // - beforeColon = "DTSTART;VALUE=DATE"
        // - fieldName = "DTSTART" (after split on ';')
        // - fieldValue = "20251125" (already correct!)
        if (fieldName === 'DTSTART') {
          currentField = 'DTSTART';
          currentValue = fieldValue; // fieldValue is already "20251125" for VALUE=DATE format
          } else if (fieldName === 'DTEND') {
          currentField = 'DTEND';
          currentValue = fieldValue; // fieldValue is already "20251128" for VALUE=DATE format
        } else if (fieldName === 'SUMMARY') {
          currentField = 'SUMMARY';
          currentValue = fieldValue;
        } else if (['UID', 'DESCRIPTION', 'LOCATION'].includes(fieldName)) {
          currentField = fieldName;
          currentValue = fieldValue;
        }
      }
    }
  }
  
  return events;
};

// Parse iCal date format
const parseICalDate = (dateStr: string): Date => {
  // Clean the date string
  dateStr = dateStr.trim();
  
  // Handle date-only format (YYYYMMDD)
  if (dateStr.length === 8 && /^\d{8}$/.test(dateStr)) {
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1;
    const day = parseInt(dateStr.substring(6, 8), 10);
    const date = new Date(year, month, day);
    return date;
  }
  
  // Handle datetime format (YYYYMMDDTHHMMSS or YYYYMMDDTHHMMSSZ)
  if (dateStr.length >= 15) {
    // Remove timezone indicators
    const cleanStr = dateStr.replace(/[TZ]/g, ' ').trim();
    const year = parseInt(cleanStr.substring(0, 4), 10);
    const month = parseInt(cleanStr.substring(4, 6), 10) - 1;
    const day = parseInt(cleanStr.substring(6, 8), 10);
    const hour = cleanStr.length > 8 ? parseInt(cleanStr.substring(9, 11) || '0', 10) : 0;
    const minute = cleanStr.length > 10 ? parseInt(cleanStr.substring(11, 13) || '0', 10) : 0;
    const second = cleanStr.length > 12 ? parseInt(cleanStr.substring(13, 15) || '0', 10) : 0;
    const date = new Date(year, month, day, hour, minute, second);
    return date;
  }
  
  // Try to parse as ISO date string
  const isoDate = new Date(dateStr);
  if (!isNaN(isoDate.getTime())) {
    return isoDate;
  }
  
  // Fallback
  return new Date();
};

// Cache for calendar data (10 minute cache for better performance)
let calendarCache: { data: GoogleCalendarEvent[]; timestamp: number } | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Fetch events from Google Calendar iCal feed
export const fetchGoogleCalendarEvents = async (calendarId: string): Promise<GoogleCalendarEvent[]> => {
  try {
    if (!calendarId || calendarId.trim() === '') {
      console.warn('Google Calendar ID is empty');
      return [];
    }
    
    // Check cache first (fast path)
    if (calendarCache && Date.now() - calendarCache.timestamp < CACHE_DURATION) {
      return calendarCache.data;
    }
    
    // Use the exact working URL the user provided (hardcoded for reliability)
    const workingUrl = 'https://calendar.google.com/calendar/ical/classroom115807423677492622322%40group.calendar.google.com/public/basic.ics';
    
    let icalData: string | null = null;
    let lastError: Error | null = null;
    
    // Try CORS proxies with better error handling
    // Note: Some proxies may be rate-limited or blocked, so we try multiple
    const proxyServices = [
      // Proxy service 1: allorigins raw endpoint (returns text directly, fastest)
      `https://api.allorigins.win/raw?url=${encodeURIComponent(workingUrl)}`,
      // Proxy service 2: allorigins JSON endpoint
      `https://api.allorigins.win/get?url=${encodeURIComponent(workingUrl)}`,
      // Proxy service 3: alternative proxy
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(workingUrl)}`,
      // Proxy service 4: yacdn.org proxy
      `https://yacdn.org/proxy/${encodeURIComponent(workingUrl)}`,
      // Proxy service 5: corsproxy (may be rate-limited)
      `https://corsproxy.io/?${encodeURIComponent(workingUrl)}`,
    ];
      
    for (const proxyUrl of proxyServices) {
      try {
        // Add timeout for proxy requests (reduced for faster failure)
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Proxy request timeout')), 8000); // 8 second timeout
        });
        
        const fetchPromise = fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Accept': 'text/calendar, application/json, text/plain, */*',
          },
          cache: 'no-cache',
          mode: 'cors',
        });
        
        const proxyResponse = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (!proxyResponse.ok) {
          // Silently continue to next proxy
          continue;
        }
        
        let proxyContents: string;
        
        // Check if it's the raw endpoint (returns text directly)
        if (proxyUrl.includes('/raw?') || proxyUrl.includes('/proxy/') || proxyUrl.includes('cors-anywhere')) {
          proxyContents = await proxyResponse.text();
        } else if (proxyUrl.includes('/get?')) {
          // Try to parse as JSON first (allorigins format)
          try {
            const proxyData = await proxyResponse.json();
            proxyContents = proxyData.contents || proxyData;
          } catch {
            // If not JSON, try as text
            proxyContents = await proxyResponse.text();
          }
        } else {
          // Default: try text first
          proxyContents = await proxyResponse.text();
        }
        
        // Check if the proxy returned a data URL with base64 content
        if (proxyContents && proxyContents.startsWith('data:text/calendar')) {
          // Extract base64 part from data URL: data:text/calendar; charset=utf-8;base64,BASE64_CONTENT
          const base64Match = proxyContents.match(/base64,(.+)/);
          if (base64Match && base64Match[1]) {
            try {
              // Decode base64
              proxyContents = atob(base64Match[1]);
            } catch (e) {
              continue; // Try next proxy
            }
          }
        }
        
        // Check if we got valid iCal data
        if (proxyContents && (proxyContents.includes('BEGIN:VCALENDAR') || proxyContents.includes('BEGIN:VEVENT'))) {
          icalData = proxyContents;
          break; // Success, exit loop
        } else {
          continue; // Try next proxy
        }
      } catch (proxyError) {
        // Silently continue to next proxy - don't log errors to avoid console spam
        lastError = proxyError instanceof Error ? proxyError : new Error(String(proxyError));
        continue; // Try next proxy
      }
    }
    
    if (!icalData) {
      // Return cached data if available, even if expired, as fallback
      if (calendarCache && calendarCache.data.length > 0) {
        return calendarCache.data;
      }
      // Return empty array instead of throwing - allows page to still load
      return [];
    }
    
    if (!icalData || icalData.length === 0) {
      // Return cached data if available as fallback
      if (calendarCache && calendarCache.data.length > 0) {
        return calendarCache.data;
      }
      return [];
    }
    
    // Check if it's valid iCal format
    // Also check for base64 data URLs that need decoding
    if (icalData.startsWith('data:text/calendar')) {
      const base64Match = icalData.match(/base64,(.+)/);
      if (base64Match && base64Match[1]) {
        try {
          icalData = atob(base64Match[1]);
        } catch (e) {
          return [];
        }
      }
    }
    
    if (!icalData.includes('BEGIN:VCALENDAR') && !icalData.includes('BEGIN:VEVENT')) {
      // Try to see if it's base64 encoded
      try {
        const decoded = atob(icalData);
        if (decoded.includes('BEGIN:VCALENDAR') || decoded.includes('BEGIN:VEVENT')) {
          icalData = decoded;
        } else {
          return [];
        }
      } catch (e) {
        return [];
      }
    }
    
    const events = parseICal(icalData);
    
    // Cache the results
    calendarCache = {
      data: events,
      timestamp: Date.now(),
    };
    
    return events;
  } catch (error) {
    // Silently handle errors - return cached data if available, otherwise empty array
    // This prevents console spam and allows the page to function normally
    if (calendarCache && calendarCache.data.length > 0) {
      return calendarCache.data;
    }
    return [];
  }
};

// Convert Google Calendar event to our Event format
export const convertGoogleEventToEvent = (
  googleEvent: GoogleCalendarEvent,
  index: number,
  defaultImage: string
): {
  id: string;
  title: string;
  category: string;
  startDate: Date;
  endDate: Date;
  duration: string;
  location: string;
  description: string;
  image: string;
  isMultiDay: boolean;
} => {
  const start = new Date(googleEvent.startDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(googleEvent.endDate);
  end.setHours(0, 0, 0, 0);
  
  // Calculate duration correctly (inclusive of both start and end dates)
  const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1;
  const isMultiDay = daysDiff > 1;
  const duration = isMultiDay ? `${daysDiff} Days` : '1 Day';
  
  // Extract category from title or description
  const category = extractCategory(googleEvent.title, googleEvent.description);
  
  // Clean description - strip HTML and decode entities, preserve emojis and line breaks
  let description = googleEvent.description || googleEvent.title;
  if (description) {
    // Strip HTML tags but preserve structure
    // Replace list items with line breaks BEFORE removing tags
    description = description.replace(/<\/li>/gi, '\n').replace(/<\/p>/gi, '\n\n').replace(/<\/div>/gi, '\n').replace(/<\/h[1-6]>/gi, '\n\n');
    description = description.replace(/<li[^>]*>/gi, '• ').replace(/<p[^>]*>/gi, '').replace(/<div[^>]*>/gi, '').replace(/<h[1-6][^>]*>/gi, '');
    description = description.replace(/<[^>]*>/g, ''); // Remove remaining HTML tags
    
    // Decode HTML entities BEFORE cleaning whitespace (to preserve emojis)
    const textarea = document.createElement('textarea');
    textarea.innerHTML = description;
    description = textarea.value || description;
    
    // Clean up multiple line breaks (but preserve single line breaks)
    description = description.replace(/\n{3,}/g, '\n\n');
    // Remove trailing special characters but preserve emojis
    description = description.replace(/[Â\u00A0]+/g, ' ').trim();
    // Clean up any remaining encoding issues (but not emojis)
    description = description.replace(/\u00C2\u00A0/g, ' ').replace(/\u00A0/g, ' ').trim();
  }
  
  return {
    id: `google-${googleEvent.id || index}`,
    title: googleEvent.title,
    category,
    startDate: start,
    endDate: end,
    duration,
    location: googleEvent.location || 'Camp Site',
    description: description,
    image: defaultImage,
    isMultiDay,
  };
};

// Extract category from event title/description
const extractCategory = (title: string, description?: string): string => {
  const text = `${title} ${description || ''}`.toLowerCase();
  
  if (text.includes('survival') || text.includes('military')) return 'Survival';
  if (text.includes('wellness') || text.includes('meditation') || text.includes('yoga')) return 'Wellness';
  if (text.includes('kids') || text.includes('children')) return 'Children\'s Camping';
  if (text.includes('water') || text.includes('sports') || text.includes('hike')) return 'Adventure';
  if (text.includes('farm') || text.includes('permaculture')) return 'Homesteading';
  
  return 'Event';
};

