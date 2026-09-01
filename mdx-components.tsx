import type { MDXComponents } from 'mdx/types'
import dynamic from 'next/dynamic'
import type { ReactNode, ComponentType } from 'react'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
import {
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { cssVariablesTheme, highlighterPromise, getHighlighter } from '@/lib/shiki'

import Link from 'next/link'
import Image from 'next/image'

// @ts-ignore
import { InlineMath, BlockMath } from 'react-katex'

import { Card } from '@/components/card'
import { BlockSideTitle } from '@/components/block-sidetitle'
import { FootNote, FootNoteRef } from "@/components/foot-note";

import { TweetCard } from '@/components/tweet-card'
import { RedditEmbed } from '@/components/reddit-embed'
import { ArticleTable } from '@/components/article-table'
import { CobeGlobe } from '@/components/bio/cobe-globe'

// The original implementations fetch private photo data. Public content keeps
// the surrounding article intact without including that service layer.
const UnavailableMedia = () => null
const HomePinPhotos = UnavailableMedia
const EpisodeImages = UnavailableMedia

// All article components are lazily code-split (dynamic import)

const DemoGrid = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoGrid }))
)
const DemoMovement = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoMovement }))
)
const OGSizeDemo = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.OGSizeDemo }))
)
const DemoPixelBlocks = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoPixelBlocks }))
)
const DemoQuality = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoQuality }))
)
const DemoColorChannels = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoColorChannels }))
)
const DemoAnatomy = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoAnatomy }))
)
const DemoFold = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoFold }))
)
const DemoMagicUI = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoMagicUI }))
)
const DynamicIsland = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DynamicIsland }))
)
const Notification = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.Notification }))
)
const Paginations = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.Paginations }))
)
const Payment = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.Payment }))
)
const DemoMotionComponent = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoMotionComponent }))
)
const DemoAnimateInitial = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoAnimateInitial }))
)
const DemoTransition = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoTransition }))
)
const DemoLayout = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoLayout }))
)
const DemoAnimatePresence = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoAnimatePresence }))
)
const DemoGesture = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoGesture }))
)
const PaintingGallery = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.PaintingGallery }))
)
const GalleryPlacard = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.GalleryPlacard }))
)
const LatencyColorGuide = UnavailableMedia
const RGBSliders = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.RGBSliders }))
)
const VisibleSpectrumStrip = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.VisibleSpectrumStrip }))
)
const VisibleSpectrumSensitivity = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.VisibleSpectrumSensitivity }))
)
const ConeSensitivityChart = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.ConeSensitivityChart }))
)
const SnakeGame = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.SnakeGame }))
)
const OGEditor = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.OGEditor }))
)
const PhotoCropper = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.PhotoCropper }))
)
const PhotoFilter = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.PhotoFilter }))
)
const CompositionOverlay = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.CompositionOverlay }))
)
const TraceroutePanel = UnavailableMedia

const GitHubMap = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.GitHubMap }))
)
const GitHubStarHistory = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.GitHubStarHistory }))
)
const CompoundInterestCalculator = dynamic(
  () => import('@/components/articles/power-law').then(m => ({ default: m.CompoundInterestCalculator }))
)
const DailyGrowthViz = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DailyGrowthViz }))
)
const DemoBoxModel = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoBoxModel }))
)
const DemoFlexbox = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoFlexbox }))
)
const DemoCSSGrid = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoCSSGrid }))
)
const DemoPosition = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoPosition }))
)
const DemoHandshake = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoHandshake }))
)
const DemoSegment = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoSegment }))
)
const DemoStateMachine = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoStateMachine }))
)
const StackLayers = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.StackLayers }))
)
const DemoRenderingEnv = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoRenderingEnv }))
)
const DemoComponentTree = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoComponentTree }))
)
const DemoComposition = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoComposition }))
)
const DemoBlogArchitecture = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoBlogArchitecture }))
)
const DemoFileViewer = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoFileViewer }))
)
const DemoNextRoutes = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoNextRoutes }))
)
const DemoDOMTree = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoDOMTree }))
)
const DemoEventBubbling = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoEventBubbling }))
)
const DemoDOMQuery = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoDOMQuery }))
)
const GitContributorsStats = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.GitContributorsStats }))
)
const GitHubCommitCard = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.GitHubCommitCard }))
)
const SccReport = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.SccReport }))
)
const DemoHTTPMessage = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoHTTPMessage }))
)
const DemoRequestCycle = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoRequestCycle }))
)
const DemoStatusCodes = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoStatusCodes }))
)
const DemoOOPillars = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoOOPillars }))
)
const DemoPolymorphism = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoPolymorphism }))
)
const DemoUMLRelationships = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoUMLRelationships }))
)
const DemoStrategyPattern = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoStrategyPattern }))
)
const DemoCodeSmells = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoCodeSmells }))
)
const DemoBigO = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoBigO }))
)
const DemoArray = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoArray }))
)
const DemoStackQueue = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoStackQueue }))
)
const DemoLinkedList = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoLinkedList }))
)
const DemoBST = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoBST }))
)
const DemoSortVisualizer = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoSortVisualizer }))
)
const DemoMergeSort = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoMergeSort }))
)
const DemoShikiTimeline = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoShikiTimeline }))
)
const DemoCoinFlip = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoCoinFlip }))
)
const DemoGalton = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoGalton }))
)
const DemoNormalParams = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoNormalParams }))
)
const ConcreteTextureDemo = dynamic(
  () => import('@/components/articles/concrete-texture').then(m => ({ default: m.ConcreteTextureDemo }))
)
const ImagePrompt = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.ImagePrompt }))
)
const DemoIdentityRouter = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoIdentityRouter }))
)
const DemoConfigSnippets = dynamic(
  () => import('@/components/articles').then(m => ({ default: m.DemoConfigSnippets }))
)

export const components: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((props: any) => ReactNode | Promise<ReactNode>)
  | ComponentType<any>
> = {
  h1: (props) => (
    <h1
      className='font-semibold mb-7 text-rurikon-600 text-balance'
      {...props}
    />
  ),
  h2: ({ children, ...props }) => {
    const getText = (node: any): string => {
      if (typeof node === 'string') return node
      if (Array.isArray(node)) return node.map(getText).join('')
      if (node?.props?.children) return getText(node.props.children)
      return ''
    }
    const id = getText(children)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    return (
      <h2
        id={id}
        className='group relative font-semibold mt-14 mb-7 text-rurikon-600 text-balance scroll-mt-14'
        {...props}
      >
        <a
          href={`#${id}`}
          className='absolute pr-7 py-3.5 -left-7 -top-3.5 opacity-0 blur-xs group-hover:opacity-100 group-hover:blur-none text-rurikon-200 hover:text-rurikon-500 transition-all delay-0 duration-500 group-target:blur-none group-target:opacity-100 group-hover:delay-300 select-none'
          aria-label='Link to this section'
        >
          #
        </a>
        {children}
      </h2>
    )
  },
  h3: (props) => (
    <h3
      className='font-semibold mt-14 mb-7 text-rurikon-600 text-balance'
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className='mt-7 list-disc list-outside marker:text-rurikon-200 pl-5'
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className='mt-7 list-decimal list-outside marker:text-rurikon-200 pl-5'
      {...props}
    />
  ),
  li: (props) => <li className='pl-1.5' {...props} />,
  a: ({ href, ...props }) => {
    const className =
      'wrap-break-word decoration-from-font underline underline-offset-2 decoration-rurikon-300 hover:decoration-rurikon-600 focus-visible:outline focus-visible:outline-rurikon-400 focus-visible:rounded-xs focus-visible:outline-offset-1 focus-visible:outline-dotted'

    if (href?.startsWith('#')) {
      return (
        <a className={className} href={href} draggable={false} {...props} />
      )
    }

    return (
      <Link
        className={className}
        href={href}
        draggable={false}
        {...(href?.startsWith('https://')
          ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
          : {})}
        {...props}
      />
    )
  },
  strong: (props) => <strong className='font-bold' {...props} />,
  p: (props) => <p className='mt-7' {...props} />,
  blockquote: (props) => (
    <blockquote
      className='pl-6 -ml-6 sm:pl-10 sm:-ml-10 md:pl-14 md:-ml-14 not-mobile:text-rurikon-400'
      {...props}
    />
  ),
  pre: (props) => (
    <pre className='mt-7 whitespace-pre md:whitespace-pre-wrap' {...props} />
  ),
  code: async (props) => {
    if (typeof props.children === 'string') {
      const classNames = props.className || ''
      let twoSlash = false
      let lang = 'language-jsx'

      for (const className of classNames.split(',')) {
        if (className.startsWith('language-')) {
          lang = className
        } else if (className === 'twoslash') {
          twoSlash = true
        }
      }

      const resolvedLang = lang.replace('language-', '')
      // Use cached highlighter synchronously after first warm-up; await only on cold start.
      const highlighter = getHighlighter() ?? (await highlighterPromise)

      const transformers = [
        {
          // Since we're using dangerouslySetInnerHTML, the code and pre
          // tags should be removed.
          pre: (hast: any) => {
            if (hast.children.length !== 1) {
              throw new Error('<pre>: Expected a single <code> child')
            }
            if (hast.children[0].type !== 'element') {
              throw new Error('<pre>: Expected a <code> child')
            }
            return hast.children[0]
          },
          postprocess(html: string) {
            return html.replace(/^<code>|<\/code>$/g, '')
          },
        },
        twoSlash
          ? (transformerTwoslash({
            renderer: rendererRich({
              errorRendering: 'hover',
            }),
          }) as any)
          : undefined,
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
      ].filter(Boolean)

      let code: string
      try {
        code = highlighter.codeToHtml(props.children, {
          lang: resolvedLang,
          theme: cssVariablesTheme,
          transformers,
        })
      } catch (err) {
        // Only attempt on-demand language loading when the error is specifically
        // a missing-language error from Shiki. All other errors (transformer
        // failures, invalid HTML, etc.) are re-thrown immediately so the
        // original diagnostic is preserved.
        const isUnknownLang =
          err instanceof Error &&
          err.message.toLowerCase().includes(resolvedLang.toLowerCase()) &&
          (err.message.includes('not loaded') || err.message.includes('Unknown language'))
        if (!isUnknownLang) throw err

        await highlighter.loadLanguage(resolvedLang as any)
        code = highlighter.codeToHtml(props.children, {
          lang: resolvedLang,
          theme: cssVariablesTheme,
          transformers,
        })
      }

      return (
        <code
          className='inline shiki css-variables text-[0.805rem] sm:text-[13.8px] md:text-[0.92rem]'
          dangerouslySetInnerHTML={{ __html: code }}
        />
      )
    }

    return <code className='inline' {...props} />
  },
  Card,
  Image,
  img: async ({ src, alt, title }) => {
    let img: React.ReactNode

    if (src.startsWith('https://')) {
      img = (
        <Image
          className='mt-7'
          src={src}
          alt={alt}
          quality={95}
          placeholder='blur'
          width={800}
          height={600}
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PuXrGQAAAABJRU5ErkJggg=='
          draggable={false}
        />
      )
    } else {
      const image = await import('./assets/images/' + src)
      img = (
        <Image
          className='mt-7'
          src={image.default}
          alt={alt}
          quality={95}
          placeholder='blur'
          draggable={false}
        />
      )
    }

    if (title) {
      return <BlockSideTitle title={title}>{img}</BlockSideTitle>
    }

    return img
  },
  hr: (props) => <hr className='my-14 w-24 border-rurikon-border' {...props} />,
  section: (props) => {
    if (props['data-footnotes']) {
      return (
        <section
          className='sidenote block relative mt-3.5 mb-7 mx-auto text-left text-pretty w-[80%] text-xs sm:text-sm leading-5 sm:leading-6 text-rurikon-400 text:inline text:float-right text:clear-right text:w-[50%] text:-mr-[50%] text:mt-0 text:pl-7'
          {...props}
        />
      )
    }
    return <section {...props} />
  },
  table: ({ children, ...props }) => {
    const filtered = Array.isArray(children) ? children.filter((c: unknown) => typeof c !== 'string') : children;
    return (
      <div className='my-8 border border-rurikon-border bg-[#fefefe] overflow-x-auto'>
        <table className='w-full text-xs text-rurikon-500 border-collapse' {...props}>{filtered}</table>
      </div>
    )
  },
  thead: ({ children, ...props }) => {
    const filtered = Array.isArray(children) ? children.filter((c: unknown) => typeof c !== 'string') : children;
    return <thead className='border-b border-rurikon-border text-rurikon-300' {...props}>{filtered}</thead>
  },
  tbody: ({ children, ...props }) => {
    const filtered = Array.isArray(children) ? children.filter((c: unknown) => typeof c !== 'string') : children;
    return <tbody {...props}>{filtered}</tbody>
  },
  tr: ({ children, ...props }) => {
    const filtered = Array.isArray(children) ? children.filter((c: unknown) => typeof c !== 'string') : children;
    return <tr className='border-b border-rurikon-border/40 last:border-0' {...props}>{filtered}</tr>
  },
  th: (props) => (
    <th
      className='text-left lowercase font-normal px-3 py-2'
      {...props}
    />
  ),
  td: (props) => (
    <td className='px-3 py-1.5 tabular-nums' {...props} />
  ),
  BlockSideTitle,
  ArticleTable,
  InlineMath,
  BlockMath,
  EpisodeImages,
  HomePinPhotos,
  TweetCard,
  GitHubMap,
  RedditEmbed,
  FootNote,
  FootNoteRef,
  DemoGrid,
  DemoMovement,
  SnakeGame,
  OGSizeDemo,
  OGEditor,
  DemoPixelBlocks,
  DemoQuality,
  DemoColorChannels,
  DemoAnatomy,
  DemoFold,
  DemoMagicUI,
  DynamicIsland,
  Notification,
  Paginations,
  Payment,
  DemoMotionComponent,
  DemoAnimateInitial,
  DemoTransition,
  DemoLayout,
  DemoAnimatePresence,
  DemoGesture,
  PaintingGallery,
  GalleryPlacard,
  TraceroutePanel,
  LatencyColorGuide,
  RGBSliders,
  VisibleSpectrumStrip,
  VisibleSpectrumSensitivity,
  ConeSensitivityChart,
  GitHubStarHistory,
  CompoundInterestCalculator,
  DailyGrowthViz,
  PhotoCropper,
  PhotoFilter,
  CompositionOverlay,
  DemoBoxModel,
  DemoFlexbox,
  DemoCSSGrid,
  DemoPosition,
  DemoHandshake,
  DemoSegment,
  DemoStateMachine,
  StackLayers,
  DemoRenderingEnv,
  DemoComponentTree,
  DemoComposition,
  DemoBlogArchitecture,
  DemoDOMTree,
  DemoEventBubbling,
  DemoDOMQuery,
  DemoFileViewer,
  DemoNextRoutes,
  GitContributorsStats,
  GitHubCommitCard,
  SccReport,
  DemoHTTPMessage,
  DemoRequestCycle,
  DemoStatusCodes,
  DemoOOPillars,
  DemoPolymorphism,
  DemoUMLRelationships,
  DemoStrategyPattern,
  DemoCodeSmells,
  DemoBigO,
  DemoArray,
  DemoStackQueue,
  DemoLinkedList,
  DemoBST,
  DemoSortVisualizer,
  DemoMergeSort,
  DemoShikiTimeline,
  DemoCoinFlip,
  DemoGalton,
  DemoNormalParams,
  ConcreteTextureDemo,
  ImagePrompt,
  DemoIdentityRouter,
  DemoConfigSnippets,
  CobeGlobe,
}

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...(components as any),
  }
}
