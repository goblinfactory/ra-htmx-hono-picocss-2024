import { PropsWithChildren } from "hono/jsx"
import { glowCss } from '@/framework/third-party/nuejs-glow-css.js'
import { glow } from "@/framework/third-party/nuejs-glow.js"

export type CodeProps = {
    language: string,
    includeStyle?: boolean
}

const css = glowCss

const style = (include: boolean) => {
    if (!include) return <></>
    return (<style>{css}</style>)
}


// update to be able to provide an element ID and simply drop the innerHTML inside the PRE. 
const Code = ({ children, language, includeStyle = true }: PropsWithChildren<CodeProps>) => {

    const codeString = typeof children === 'string' ? children : String(children)

    const highlightedCode = glow(codeString, {
        language,
        numbered: true,
        prefix: true,
        mark: true
    })
    const inner = { __html: highlightedCode }

    return (
        <>
            {style(includeStyle)}
            <pre dangerouslySetInnerHTML={inner} />
        </>
    )
}

export default Code