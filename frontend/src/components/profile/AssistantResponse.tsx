interface Props {
    text: string;
}

type Section = {
    title: string;
    lines: string[];
};

const parseSections = (text: string): Section[] => {
    const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    const sections: Section[] = [];
    let current: Section = { title: "Summary", lines: [] };

    for (const line of lines) {
        if (line.endsWith(":") && line.length > 1) {
            if (current.lines.length > 0) sections.push(current);
            current = { title: line.slice(0, -1), lines: [] };
            continue;
        }
        current.lines.push(line);
    }

    if (current.lines.length > 0) sections.push(current);
    return sections;
};

export default function AssistantResponse({ text }: Props) {
    const sections = parseSections(text);

    return (
        <div className="assistant-response">
            {sections.map((section) => {
                const listItems = section.lines.filter((line) => /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line));
                const proseItems = section.lines.filter((line) => !/^[-*]\s+/.test(line) && !/^\d+\.\s+/.test(line));

                return (
                    <section className="assistant-section" key={`${section.title}-${section.lines.join("|")}`}>
                        <h4 className="assistant-title">{section.title}</h4>
                        {proseItems.map((line) => (
                            <p className="assistant-line" key={`${section.title}-${line}`}>{line}</p>
                        ))}
                        {listItems.length > 0 && (
                            <ul className="assistant-list">
                                {listItems.map((line) => (
                                    <li key={`${section.title}-${line}`}>{line.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "")}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                );
            })}
        </div>
    );
}
