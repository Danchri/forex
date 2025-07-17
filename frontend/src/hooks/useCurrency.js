import { useState, useEffect } from 'react'

export const useCurrency = () => {
  const [exchangeRate, setExchangeRate] = useState(150) // Default fallback rate
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    fetchExchangeRate()
  }, [])

  const fetchExchangeRate = async () => {
    try {
      setIsLoading(true)
      
      // Try multiple exchange rate APIs for reliability
      const apis = [
        // Free API - exchangerate-api.com
        'https://api.exchangerate-api.com/v4/latest/USD',
        // Backup API - fixer.io (requires API key in production)
        // 'https://api.fixer.io/latest?base=USD&symbols=KES',
      ]

      let rate = null
      
      for (const apiUrl of apis) {
        try {
          const response = await fetch(apiUrl)
          if (response.ok) {
            const data = await response.json()
            
            if (data.rates && data.rates.KES) {
              rate = data.rates.KES
              break
            }
          }
        } catch (error) {
          console.warn(`Failed to fetch from ${apiUrl}:`, error)
          continue
        }
      }

      if (rate) {
        setExchangeRate(rate)
        setLastUpdated(new Date())
        // Cache the rate in localStorage with timestamp
        localStorage.setItem('exchangeRate', JSON.stringify({
          rate,
          timestamp: Date.now()
        }))
      } else {
        // Try to use cached rate if API fails
        const cached = localStorage.getItem('exchangeRate')
        if (cached) {
          const { rate: cachedRate, timestamp } = JSON.parse(cached)
          // Use cached rate if it's less than 1 hour old
          if (Date.now() - timestamp < 3600000) {
            setExchangeRate(cachedRate)
            setLastUpdated(new Date(timestamp))
          }
        }
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
      
      // Try to use cached rate as fallback
      const cached = localStorage.getItem('exchangeRate')
      if (cached) {
        try {
          const { rate: cachedRate, timestamp } = JSON.parse(cached)
          setExchangeRate(cachedRate)
          setLastUpdated(new Date(timestamp))
        } catch (parseError) {
          console.error('Error parsing cached rate:', parseError)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const convertUSDToKSH = (usdAmount) => {
    const numericAmount = typeof usdAmount === 'string' 
      ? parseFloat(usdAmount.replace('$', '')) 
      : usdAmount
    
    return Math.round(numericAmount * exchangeRate)
  }

  const formatKSH = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatUSDToKSH = (usdAmount) => {
    const kshAmount = convertUSDToKSH(usdAmount)
    return formatKSH(kshAmount)
  }

  const refreshRate = () => {
    fetchExchangeRate()
  }

  return {
    exchangeRate,
    isLoading,
    lastUpdated,
    convertUSDToKSH,
    formatKSH,
    formatUSDToKSH,
    refreshRate
  }
}
