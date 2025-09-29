"use client"

import Link from '@/components/link'
import { Code2, Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin, ArrowUp, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { subscribeToNewsletter } from '@/lib/actions'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Spinner from './reusable/spinner'

const navigation = {
  solutions: [
    { name: 'Web Development', href: '/services#web-development', description: 'Modern web applications' },
    { name: 'Mobile Apps', href: '/services#mobile-apps', description: 'iOS & Android development' },
    { name: 'Cloud Solutions', href: '/services#cloud-solutions', description: 'Scalable cloud infrastructure' },
    { name: 'Consulting', href: '/services#consulting', description: 'Technical advisory services' },
  ],
  company: [
    { name: 'About', href: '/about', description: 'Learn about our mission' },
    { name: 'Portfolio', href: '/portfolio', description: 'View our work' },
    { name: 'Contact', href: '/contact', description: 'Get in touch' },
    { name: 'Blog', href: '/blog', description: 'Latest insights' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs', description: 'Technical guides' },
    { name: 'Support', href: '/support', description: 'Get help' },
    { name: 'Status', href: '/status', description: 'System status' },
    { name: 'Changelog', href: '/changelog', description: 'Latest updates' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy', description: 'How we protect your data' },
    { name: 'Terms of Service', href: '/terms', description: 'Usage terms' },
    { name: 'Cookie Policy', href: '/cookies', description: 'Cookie usage' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://facebook.com/cyberwizdev',
      icon: Facebook,
      color: 'hover:text-blue-500'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/cyberwizdev',
      icon: Twitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/cyberwizdev',
      icon: Linkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/cyberwizdev',
      icon: Github,
      color: 'hover:text-gray-300'
    },
  ],
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'info@cyberwizdev.com.ng',
    href: 'mailto:info@cyberwizdev.com.ng'
  },
  {
    icon: Phone,
    label: 'Call us',
    value: '+234 (703) 312-8149',
    href: 'tel:+2347033128149'
  },
  {
    icon: MapPin,
    label: 'Visit us',
    value: 'Lagos, Nigeria',
    href: 'https://maps.google.com/?q=Lagos,Nigeria'
  }
]

export function Footer() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setLoading(true)
    try {
      await subscribeToNewsletter(email)
      toast.success("Welcome aboard! Check your email for confirmation.")
      setEmail("")
      setSubscribed(true)
      
      // Reset subscription success state after 5 seconds
      setTimeout(() => setSubscribed(false), 5000)
    } catch (ex: any) {
      toast.error(ex.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" aria-labelledby="footer-heading">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#3498db]/5"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#3498db]/3"></div>
        </div>

        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        
        <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-5 xl:gap-8">
            {/* Brand Section */}
            <div className="space-y-8 xl:col-span-2">
              <div>
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="relative">
                    <Code2 className="h-8 w-8 text-[#3498db] group-hover:text-[#2980b9] transition-colors duration-300" />
                    <div className="absolute inset-0 h-8 w-8 bg-[#3498db]/20 rounded-full blur-md group-hover:bg-[#2980b9]/30 transition-all duration-300"></div>
                  </div>
                  <span className="text-xl font-bold text-white group-hover:text-[#3498db] transition-colors duration-300">
                    Cyberwizdev
                  </span>
                </Link>
                <p className="mt-4 text-base leading-7 text-gray-300 max-w-md">
                  Transforming businesses through innovative software solutions. 
                  We craft digital experiences that drive growth and success.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold leading-6 text-white">Contact Info</h3>
                <div className="space-y-3">
                  {contactInfo.map((contact) => (
                    <Link
                      key={contact.label}
                      href={contact.href}
                      className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors duration-300 group"
                      target={contact.href.startsWith('http') ? '_blank' : '_self'}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <contact.icon className="h-4 w-4 text-[#3498db] group-hover:scale-110 transition-transform duration-300" />
                      <span>{contact.value}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-6">
                {navigation.social.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className={`text-gray-500 ${item.color} transition-all duration-300 transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-[#3498db]/50 rounded-lg p-1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${item.name}`}
                  >
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 xl:col-span-3 xl:mt-0">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white mb-6">Solutions</h3>
                <ul role="list" className="space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="group block text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        <span className="font-medium">{item.name}</span>
                        <p className="text-xs text-gray-500 group-hover:text-gray-400 mt-1">{item.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold leading-6 text-white mb-6">Company</h3>
                <ul role="list" className="space-y-4 mb-8">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="group block text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        <span className="font-medium">{item.name}</span>
                        <p className="text-xs text-gray-500 group-hover:text-gray-400 mt-1">{item.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>

                <h3 className="text-sm font-semibold leading-6 text-white mb-6">Resources</h3>
                <ul role="list" className="space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="group block text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        <span className="font-medium">{item.name}</span>
                        <p className="text-xs text-gray-500 group-hover:text-gray-400 mt-1">{item.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold leading-6 text-white mb-6">Legal</h3>
                <ul role="list" className="space-y-4 mb-8">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="group block text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        <span className="font-medium">{item.name}</span>
                        <p className="text-xs text-gray-500 group-hover:text-gray-400 mt-1">{item.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Newsletter Subscription */}
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white mb-2">
                    Stay Updated
                  </h3>
                  <p className="text-xs leading-5 text-gray-400 mb-4">
                    Get insights, tips, and updates delivered to your inbox.
                  </p>
                  
                  {subscribed ? (
                    <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400">Successfully subscribed!</span>
                    </div>
                  ) : (
                    <form className="space-y-3" onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Email address
                        </label>
                        <Input
                          type="email"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full appearance-none rounded-lg border-0 bg-white/5 px-3 py-2.5 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#3498db] backdrop-blur-sm"
                          placeholder="your@email.com"
                          disabled={loading}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={loading || !email.trim()}
                        className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <Spinner />
                            <span>Subscribing...</span>
                          </div>
                        ) : (
                          'Subscribe'
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <p className="text-xs leading-5 text-gray-400">
                &copy; {new Date().getFullYear()} Cyberwizdev Software Solutions. All rights reserved.
              </p>
              <div className="mt-4 sm:mt-0 flex items-center gap-4 text-xs text-gray-400">
                <span>Made with ❤️ by cyberwizdev</span>
                <span>•</span>
                <Link href="/sitemap" className="hover:text-white transition-colors duration-300">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}