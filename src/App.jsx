import { useState } from 'react'
import './App.css'

const stories = [
  { name: 'Your Story', initial: 'Y', own: true },
  { name: 'Aarav', initial: 'A', color: 'cyan' },
  { name: 'Riya', initial: 'R', color: 'purple' },
  { name: 'Karan', initial: 'K', color: 'blue' },
  { name: 'Dev', initial: 'D', color: 'pink' },
  { name: 'Anya', initial: 'A', color: 'cyan' },
]

const posts = [
  {
    name: 'Aarav',
    username: '@aarav',
    initial: 'A',
    time: '12 min',
    text: 'Late night coding hits different. 🚀',
    likes: 248,
    comments: 31,
    gradient: 'cyan-purple',
  },
  {
    name: 'Riya',
    username: '@riya',
    initial: 'R',
    time: '42 min',
    text: 'Building something new. Stay tuned. 💜',
    likes: 184,
    comments: 18,
    gradient: 'purple-blue',
  },
  {
    name: 'Karan',
    username: '@karan',
    initial: 'K',
    time: '1 hr',
    text: 'New day. New ideas. ⚡',
    likes: 96,
    comments: 12,
    gradient: 'blue-cyan',
  },
]

function App() {
  const [active, setActive] = useState('Home')
  const [likedPosts, setLikedPosts] = useState([])

  const toggleLike = (index) => {
    setLikedPosts((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    )
  }

  const navItems = [
    { name: 'Home', icon: '⌂' },
    { name: 'Search', icon: '⌕' },
    { name: 'Explore', icon: '◈' },
    { name: 'Messages', icon: '◇' },
    { name: 'Notifications', icon: '♡' },
    { name: 'Profile', icon: '◯' },
  ]

  return (
    <div className="xenova-app">
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>

      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">X</div>
          <span>Xenova</span>
        </div>

        <nav className="main-nav">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${active === item.name ? 'active' : ''}`}
              onClick={() => setActive(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
              {item.name === 'Messages' && <span className="message-dot">3</span>}
            </button>
          ))}
        </nav>

        <button className="create-button">
          <span>＋</span>
          Create
        </button>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <span className="nav-icon">☰</span>
            More
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        <header className="mobile-header">
          <div className="brand">
            <div className="brand-mark">X</div>
            <span>Xenova</span>
          </div>

          <div className="mobile-actions">
            <button>♡</button>
            <button>◇</button>
          </div>
        </header>

        {/* Stories */}
        <section className="stories-card">
          <div className="stories">
            {stories.map((story, index) => (
              <button className="story" key={story.name}>
                <div
                  className={`story-ring ${
                    story.own ? 'own-story' : story.color
                  }`}
                >
                  <div className="story-avatar">{story.initial}</div>
                  {story.own && <span className="story-plus">+</span>}
                </div>
                <span>{story.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Feed */}
        <section className="feed">
          {posts.map((post, index) => {
            const isLiked = likedPosts.includes(index)

            return (
              <article className="post" key={post.username}>
                <div className="post-header">
                  <div className="user-info">
                    <div className="small-avatar">{post.initial}</div>
                    <div>
                      <strong>{post.name}</strong>
                      <span>{post.username} · {post.time}</span>
                    </div>
                  </div>

                  <button className="more-button">•••</button>
                </div>

                <p className="post-text">{post.text}</p>

                <div className={`post-visual ${post.gradient}`}>
                  <div className="visual-glow"></div>
                  <div className="visual-x">X</div>
                  <span>XENOVA</span>
                </div>

                <div className="post-actions">
                  <div className="left-actions">
                    <button
                      className={isLiked ? 'liked' : ''}
                      onClick={() => toggleLike(index)}
                      aria-label="Like post"
                    >
                      {isLiked ? '♥' : '♡'}
                    </button>
                    <button aria-label="Comment">◯</button>
                    <button aria-label="Share">⌁</button>
                  </div>

                  <button aria-label="Save post">◇</button>
                </div>

                <div className="post-stats">
                  <strong>
                    {post.likes + (isLiked ? 1 : 0)} likes
                  </strong>
                  <span>
                    View all {post.comments} comments
                  </span>
                </div>
              </article>
            )
          })}
        </section>
      </main>

      {/* Right panel */}
      <aside className="right-panel">
        <div className="profile-card">
          <div className="profile-avatar">X</div>

          <div className="profile-details">
            <strong>Xoro</strong>
            <span>@xoro</span>
          </div>

          <button className="switch-button">Switch</button>
        </div>

        <div className="suggestion-header">
          <span>Suggested for you</span>
          <button>See all</button>
        </div>

        {['Maya', 'Arjun', 'Zayn', 'Nisha'].map((name, index) => (
          <div className="suggestion" key={name}>
            <div className={`suggestion-avatar avatar-${index}`}>
              {name[0]}
            </div>

            <div className="suggestion-info">
              <strong>{name}</strong>
              <span>Suggested for you</span>
            </div>

            <button>Follow</button>
          </div>
        ))}

        <div className="footer-text">
          <span>About</span>
          <span>Help</span>
          <span>Privacy</span>
          <span>Terms</span>
          <span>© 2026 Xenova</span>
        </div>
      </aside>

      {/* Floating Create */}
      <button className="floating-create" aria-label="Create">
        ＋
      </button>

      {/* Mobile Navigation */}
      <nav className="mobile-nav">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.name}
            className={active === item.name ? 'active' : ''}
            onClick={() => setActive(item.name)}
          >
            <span>{item.icon}</span>
            {item.name === 'Messages' && <i>3</i>}
          </button>
        ))}

        <button
          className={active === 'Profile' ? 'active' : ''}
          onClick={() => setActive('Profile')}
        >
          <span className="mobile-profile">X</span>
        </button>
      </nav>
    </div>
  )
}

export default App
