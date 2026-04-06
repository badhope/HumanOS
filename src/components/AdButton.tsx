import { useEffect, useRef } from 'react'

export default function AdButton() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const ballRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const ball = ballRef.current
    const card = cardRef.current
    const close = closeRef.current

    if (!wrap || !ball || !card || !close) return

    const key = 'whiteLeftFloatAd_7day'
    const sevenDay = 604800000

    const checkShow = () => {
      const t = localStorage.getItem(key)
      if (!t || Date.now() - parseInt(t) > sevenDay) {
        wrap.style.display = 'block'
      } else {
        wrap.style.display = 'none'
      }
    }

    const handleMouseEnter = () => {
      card.style.display = 'block'
    }

    const handleClose = (e: MouseEvent) => {
      e.stopPropagation()
      wrap.style.display = 'none'
      localStorage.setItem(key, Date.now().toString())
    }

    ball.addEventListener('mouseenter', handleMouseEnter)
    close.addEventListener('click', handleClose)

    const timer = setTimeout(checkShow, 1500)

    return () => {
      ball.removeEventListener('mouseenter', handleMouseEnter)
      close.removeEventListener('click', handleClose)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="left-float-ad"
      style={{ display: 'none' }}
    >
      <style>{`
        .left-float-ad * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: system-ui, Segoe UI, Roboto, sans-serif;
        }

        .left-float-ad {
          position: fixed;
          left: 15px;
          bottom: 80px;
          z-index: 30;
        }

        .ad-float-ball {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
          opacity: 0.6;
        }

        .ad-float-ball:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          opacity: 1;
        }

        .ad-float-ball span {
          font-size: 11px;
          color: #999;
          font-weight: 500;
        }

        .ad-card-box {
          width: 240px;
          background: #fff;
          box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
          border-radius: 14px;
          border: 1px solid #f5f5f5;
          padding: 20px 16px;
          position: absolute;
          left: 50px;
          bottom: 0;
          display: none;
          animation: fadeRight 0.4s ease;
        }

        @keyframes fadeRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .ad-close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
          border: none;
          background: #f8f8f8;
          border-radius: 50%;
          color: #999;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .ad-close-btn:hover {
          background: #eee;
        }

        .ad-tag-txt {
          font-size: 11px;
          color: #999;
          margin-bottom: 8px;
        }

        .ad-main-title {
          font-size: 15px;
          color: #333;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .ad-desc-txt {
          font-size: 12px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 14px;
        }

        .ad-action-btn {
          display: block;
          text-align: center;
          padding: 7px 0;
          background: #f7f7f7;
          color: #444;
          text-decoration: none;
          border-radius: 8px;
          font-size: 13px;
          border: 1px solid #eee;
          transition: 0.2s;
        }

        .ad-action-btn:hover {
          background: #eeeeee;
        }

        .ad-contact-txt {
          margin-top: 12px;
          font-size: 11px;
          color: #888;
          text-align: center;
        }

        @media (max-width: 768px) {
          .left-float-ad {
            left: 10px;
            bottom: 70px;
          }
          .ad-card-box {
            width: 200px;
            left: 45px;
          }
        }
      `}</style>

      <div ref={ballRef} className="ad-float-ball">
        <span>广告</span>
      </div>

      <div ref={cardRef} className="ad-card-box">
        <button ref={closeRef} className="ad-close-btn" type="button">
          ×
        </button>
        <div className="ad-tag-txt">Advertisement · 广告位招租</div>
        <h3 className="ad-main-title">全站优质广告空位</h3>
        <p className="ad-desc-txt">
          高流量精准曝光<br />
          PC/移动端全站适配<br />
          长期招商 合作共赢
        </p>
        <a href="javascript:;" className="ad-action-btn">
          点击咨询合作
        </a>
        <p className="ad-contact-txt">微信/电话：18825407105</p>
      </div>
    </div>
  )
}
