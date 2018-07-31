/**
 * parse a helper file string into program-readable object
 * @param {string} raw the raw markdown help file
 * @returns {{ name: string, module: string, description: string, parameters: string[], options: string[] }} the parsed help info
 */
export default function parseHelp(raw) {
    raw = raw.split(/\r|\n/).filter(i => i)
    const result = {
        name: 'anonymous-command',
        module: 'anonymous-module',
        description: '',
        parameters: [],
        options: [],
    }
    let inParagraph
    for (let i of raw) {
        // Name
        const nameMatched = i.match(/^#\s*([^#].*)/)
        if (nameMatched) {
            result.name = nameMatched[1]
            continue
        }
        // Module Name
        const moduleMatched = i.match(/^From\s+(.+)/i)
        if (moduleMatched) {
            result.module = moduleMatched[1]
            continue
        }
        // Description Header
        const descriptionHeaderMatched = i.match(/^##\s*Desc/i)
        if (descriptionHeaderMatched) {
            inParagraph = 'description'
            continue
        }
        // Usage Header
        const usageHeaderMatched = i.match(/^##\s*Usage/i)
        if (usageHeaderMatched) {
            inParagraph = 'usage'
            continue
        }
        // Description
        if (inParagraph === 'description') {
            result.description += `${i}\n`
            continue
        }
        // Usage
        if (inParagraph && inParagraph.startsWith('usage')) {
            // Parameter Header
            const paramHeaderMatched = i.match(/^###\s*Param/i)
            if (paramHeaderMatched) {
                inParagraph = 'usage-param'
                continue
            }
            // Options Header
            const optionHeaderMatched = i.match(/^###\s*Opt/i)
            if (optionHeaderMatched) {
                inParagraph = 'usage-option'
                continue
            }
        }
        // Parameter
        if (inParagraph === 'usage-param') {
            const paramFormatMatched = i.match(/-\s*(.+)/)
            if (paramFormatMatched) result.parameters.push(paramFormatMatched[1])
            else if (result.parameters.length > 0) result.parameters[result.parameters.length - 1] += `\n${i}`
        }
        // Options
        if (inParagraph === 'usage-option') {
            const optionFormatMatched = i.match(/-\s*(.+)/)
            if (optionFormatMatched) result.options.push(optionFormatMatched[1])
            else if (result.options.length > 0) result.options[options.length - 1] += `\n${i}`
        }
    }
    return result
}