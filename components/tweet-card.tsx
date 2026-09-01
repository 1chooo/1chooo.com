// Custom TweetCard for the thoughts section – server component
// Usage: <TweetCard id="tweet-id" />

import { Suspense } from "react"
import { enrichTweet, type EnrichedTweet } from "react-tweet"
import { getTweet, type Tweet, type TweetEntities } from "react-tweet/api"

// ── Icons ────────────────────────────────────────────────────────────────────

const XIcon = ({ className }: { className?: string }) => (
  <svg
    height="1em"
    width="1em"
    viewBox="0 0 1200 1227"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
      fill="currentColor"
    />
  </svg>
)

const VerifiedIcon = ({ className }: { className?: string }) => (
  <svg
    aria-label="Verified Account"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
  </svg>
)

// ── Helpers ──────────────────────────────────────────────────────────────────

function truncate(str: string | null, length: number) {
  if (!str || str.length <= length) return str
  return `${str.slice(0, length - 3)}...`
}

// react-tweet assumes every entity array exists; the syndication API often omits empty ones.
function withNormalizedEntities<T extends { entities?: TweetEntities }>(tweet: T): T {
  const entities = tweet.entities
  return {
    ...tweet,
    entities: {
      hashtags: entities?.hashtags ?? [],
      user_mentions: entities?.user_mentions ?? [],
      urls: entities?.urls ?? [],
      symbols: entities?.symbols ?? [],
      media: entities?.media,
    },
  }
}

function normalizeTweet(tweet: Tweet): Tweet {
  return {
    ...withNormalizedEntities(tweet),
    quoted_tweet: tweet.quoted_tweet
      ? withNormalizedEntities(tweet.quoted_tweet)
      : undefined,
  }
}

// ── Sub-components ───────────────────────────────────────────────────────────

function TweetHeader({ tweet }: { tweet: EnrichedTweet }) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <a
          href={tweet.user.url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0"
        >
          <img
            src={tweet.user.profile_image_url_https}
            alt={tweet.user.screen_name}
            width={40}
            height={40}
            className="rounded-full border border-rurikon-border"
          />
        </a>
        <div className="flex flex-col gap-0.5">
          <a
            href={tweet.user.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-rurikon-500 hover:opacity-70 transition-opacity"
          >
            {truncate(tweet.user.name, 24)}
            {(tweet.user.verified || tweet.user.is_blue_verified) && (
              <VerifiedIcon className="inline size-3.5 text-blue-500" />
            )}
          </a>
          <a
            href={tweet.user.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-rurikon-300 hover:text-rurikon-500 transition-colors"
          >
            @{truncate(tweet.user.screen_name, 20)}
          </a>
        </div>
      </div>
      <a
        href={tweet.url}
        target="_blank"
        rel="noreferrer"
        className="text-rurikon-300 hover:text-rurikon-500 transition-colors"
        aria-label="View on X"
      >
        <XIcon className="size-4" />
      </a>
    </div>
  )
}

function TweetBody({ tweet }: { tweet: EnrichedTweet }) {
  return (
    <div className="text-sm leading-relaxed text-rurikon-500">
      {tweet.entities.map((entity, idx) => {
        switch (entity.type) {
          case "url":
          case "symbol":
          case "hashtag":
          case "mention":
            return (
              <a
                key={idx}
                href={entity.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rurikon-300 hover:text-rurikon-500 transition-colors underline underline-offset-2"
              >
                {entity.text}
              </a>
            )
          case "text":
            return (
              <span
                key={idx}
                dangerouslySetInnerHTML={{ __html: entity.text }}
              />
            )
        }
      })}
    </div>
  )
}

function TweetMedia({ tweet }: { tweet: EnrichedTweet }) {
  if (!tweet.video && !tweet.photos) return null
  return (
    <div className="mt-1 flex flex-col items-center">
      {tweet.video && (
        <video
          poster={tweet.video.poster}
          autoPlay
          loop
          muted
          playsInline
          className="w-full border border-rurikon-border"
        >
          <source src={tweet.video.variants[0].src} type="video/mp4" />
        </video>
      )}
      {tweet.photos && (
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto">
          {tweet.photos.map((photo) => (
            <img
              key={photo.url}
              src={photo.url}
              width={photo.width}
              height={photo.height}
              alt={tweet.text}
              className="h-56 w-auto shrink-0 snap-center border border-rurikon-border object-cover"
            />
          ))}
        </div>
      )}
    </div>
  )
}

function TweetNotFound() {
  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] px-6 py-8 font-serif">
      <p className="text-center text-sm text-rurikon-300">Tweet not found.</p>
    </div>
  )
}

function MagicTweet({ tweet }: { tweet: Tweet }) {
  const enriched = enrichTweet(normalizeTweet(tweet))
  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] px-6 py-6 font-serif sm:px-8">
      <div className="flex flex-col gap-4">
        <TweetHeader tweet={enriched} />
        <TweetBody tweet={enriched} />
        <TweetMedia tweet={enriched} />
        <div className="border-t border-rurikon-border/40 pt-3">
          <a
            href={enriched.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-rurikon-300 hover:text-rurikon-500 transition-colors"
          >
            {new Date(enriched.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Public component ─────────────────────────────────────────────────────────

export async function TweetCard({ id }: { id: string }) {
  const tweet = await getTweet(id).catch((err) => {
    console.error(`[TweetCard] failed to fetch tweet ${id}:`, err)
    return undefined
  })

  if (!tweet) return <TweetNotFound />

  return (
    <Suspense
      fallback={
        <div className="my-8 border border-rurikon-border bg-[#fefefe] h-40 animate-pulse font-serif" />
      }
    >
      <MagicTweet tweet={tweet} />
    </Suspense>
  )
}
