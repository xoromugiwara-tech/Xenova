import { useEffect, useState } from 'react'
import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Heart,
  Plus,
  User,
  Menu,
  MoreHorizontal,
  Bookmark,
  Send,
  Image as ImageIcon,
  Video,
  X,
} from 'lucide-react'
import { supabase } from './lib/supabase'
import Auth from './Auth'
import './App.css'

const stories = [
  { name: 'Your story', initials: 'Y', own: true },
  { name: 'Aarav', initials: 'A' },
  { name: 'Mira', initials: 'M' },
  { name: 'Kiran', initials: 'K' },
  { name: 'Riya', initials: 'R' },
  { name: 'Dev', initials: 'D' },
  { name: 'Sam', initials: 'S' },
]

const posts = [
  {
    name: 'aarav.dev',
    initials: 'A',
    location: 'Guntur, India',
    text: 'Building something new. 🚀',
    likes: 248,
    comments: 18,
  },
  {
    name: 'mira.exe',
    initials: 'M',
    location: 'Hyderabad, India',
    text: 'Late night ideas hit different.',
    likes: 391,
    comments: 27,
  },
]

const suggestions = [
  { name: 'kiran.jpg', initials: 'K', reason: 'Suggested for you' },
  { name: 'riya.codes', initials: 'R', reason: 'Followed by aarav.dev' },
  { name: 'devx', initials: 'D', reason: 'New to Xenova' },
]

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  const [liked, setLiked] = useState({})
  const [saved, setSaved] = useState({})
  const [showCreate, setShowCreate] = useState(false)
  const [activeNav, setActiveNav] = useState('Home')

  // Supabase session handling
  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session)
        setLoading(false)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="app-loading">
        Loading Xenova...
      </div>
    )
  }

  // Not logged in → Auth screen
  if (!session) {
    return <Auth />
  }

  const toggleLike = (index) => {
    setLiked((current) => ({
      ...current,
      [index]: !current[index],
    }))
  }

  const toggleSave = (index) => {
    setSaved((current) => ({
      ...current,
      [index]: !current[index],
    }))
  }

  const navItems = [
    { label: 'Home', icon: Home },
    { label: 'Search', icon: Search },
    { label: 'Explore', icon: Compass },
    { label: 'Messages', icon: MessageCircle },
    { label: 'Notifications', icon: Heart },
    { label: 'Profile', icon: User },
  ]

  return (
    <div className="app-shell">

      {/* Desktop sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">X</div>
          <span>Xenova</span>
        </div>

        <nav className="side-nav">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${
                activeNav === label ? 'active' : ''
              }`}
              onClick={() => setActiveNav(label)}
            >
              <Icon
                size={23}
                strokeWidth={
                  activeNav === label ? 2.5 : 1.9
                }
              />

              <span>{label}</span>

              {label === 'Messages' && (
                <span className="notification-dot">3</span>
              )}
            </button>
          ))}
        </nav>

        <button className="nav-item more-button">
          <Menu size={23} />
          <span>More</span>
        </button>
      </aside>

      {/* Mobile header */}
      <header className="mobile-header">
        <div className="brand">
          <div className="brand-mark">X</div>
          <span>Xenova</span>
        </div>

        <div className="mobile-actions">
          <button aria-label="Notifications">
            <Heart size={22} />
          </button>

          <button aria-label="Messages">
            <MessageCircle size={22} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">

        {/* Feed */}
        <section className="feed-column">

          {/* Stories */}
          <div className="stories-card">
            <div className="stories">
              {stories.map((story) => (
                <button
                  className="story"
                  key={story.name}
                >
                  <span
                    className={`story-ring ${
                      story.own ? 'own' : ''
                    }`}
                  >
                    <span className="avatar story-avatar">
                      {story.initials}
                    </span>
                  </span>

                  <span className="story-name">
                    {story.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div className="feed">
            {posts.map((post, index) => (
              <article
                className="post-card"
                key={post.name}
              >

                {/* Post header */}
                <div className="post-header">
                  <div className="user-mini">
                    <span className="avatar">
                      {post.initials}
                    </span>

                    <div>
                      <strong>{post.name}</strong>
                      <span>{post.location}</span>
                    </div>
                  </div>

                  <button
                    className="icon-button"
                    aria-label="More options"
                  >
                    <MoreHorizontal size={21} />
                  </button>
                </div>

                {/* Post image placeholder */}
                <div
                  className={`post-media media-${index}`}
                >
                  <div className="media-glow"></div>

                  <div className="media-content">
                    <div className="media-symbol">
                      {index === 0 ? 'X' : '✦'}
                    </div>

                    <span>
                      {index === 0
                        ? 'XENOVA'
                        : 'CREATE • CONNECT • SHARE'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="post-actions">
                  <div className="left-actions">

                    <button
                      className={`icon-button ${
                        liked[index] ? 'liked' : ''
                      }`}
                      onClick={() => toggleLike(index)}
                      aria-label="Like"
                    >
                      <Heart
                        size={24}
                        fill={
                          liked[index]
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    </button>

                    <button
                      className="icon-button"
                      aria-label="Comment"
                    >
                      <MessageCircle size={23} />
                    </button>

                    <button
                      className="icon-button"
                      aria-label="Share"
                    >
                      <Send size={22} />
                    </button>
                  </div>

                  <button
                    className={`icon-button ${
                      saved[index] ? 'saved' : ''
                    }`}
                    onClick={() => toggleSave(index)}
                    aria-label="Save"
                  >
                    <Bookmark
                      size={23}
                      fill={
                        saved[index]
                          ? 'currentColor'
                          : 'none'
                      }
                    />
                  </button>
                </div>

                {/* Post information */}
                <div className="post-info">

                  <strong>
                    {post.likes +
                      (liked[index] ? 1 : 0)}{' '}
                    likes
                  </strong>

                  <p>
                    <strong>{post.name}</strong>{' '}
                    {post.text}
                  </p>

                  <button className="comments-link">
                    View all {post.comments} comments
                  </button>
                </div>

              </article>
            ))}
          </div>
        </section>

        {/* Right panel */}
        <aside className="right-panel">

          <div className="profile-row">
            <span className="avatar profile-avatar">
              X
            </span>

            <div className="profile-copy">
              <strong>your_username</strong>
              <span>Your Name</span>
            </div>

            <button className="switch-button">
              Switch
            </button>
          </div>

          <div className="suggestions-title">
            <strong>Suggested for you</strong>

            <button>See all</button>
          </div>

          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <div
                className="suggestion"
                key={suggestion.name}
              >
                <span className="avatar">
                  {suggestion.initials}
                </span>

                <div className="suggestion-copy">
                  <strong>{suggestion.name}</strong>
                  <span>{suggestion.reason}</span>
                </div>

                <button className="follow-button">
                  Follow
                </button>
              </div>
            ))}
          </div>

          <p className="footer-note">
            © 2026 Xenova · Connect differently.
          </p>
        </aside>
      </main>

      {/* Create button */}
      <button
        className="create-button"
        onClick={() => setShowCreate(true)}
      >
        <Plus size={25} />
        <span>Create</span>
      </button>

      {/* Mobile navigation */}
      <nav className="mobile-nav">
        {navItems.slice(0, 5).map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={
              activeNav === label ? 'active' : ''
            }
            onClick={() => setActiveNav(label)}
          >
            <Icon
              size={23}
              fill={
                activeNav === label &&
                label === 'Home'
                  ? 'currentColor'
                  : 'none'
              }
            />
          </button>
        ))}

        <button
          onClick={() => setActiveNav('Profile')}
          className={
            activeNav === 'Profile'
              ? 'active'
              : ''
          }
        >
          <User size={23} />
        </button>
      </nav>

      {/* Create modal */}
      {showCreate && (
        <div
          className="modal-backdrop"
          onClick={() => setShowCreate(false)}
        >
          <div
            className="create-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <strong>Create</strong>

              <button
                className="icon-button"
                onClick={() => setShowCreate(false)}
                aria-label="Close"
              >
                <X size={21} />
              </button>
            </div>

            <div className="upload-options">

              <button>
                <span className="upload-icon">
                  <ImageIcon size={25} />
                </span>

                <div>
                  <strong>Photo</strong>
                  <small>
                    Share an image with Xenova
                  </small>
                </div>
              </button>

              <button>
                <span className="upload-icon">
                  <Video size={25} />
                </span>

                <div>
                  <strong>Video</strong>
                  <small>
                    Share a video with your friends
                  </small>
                </div>
              </button>

            </div>

            <p className="modal-hint">
              Media compression and uploads will be
              connected next.
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

export default App
