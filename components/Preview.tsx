import { JSX } from "react";

// Displays the styled name visually
type Props = { 
  styledName: string
  nameSyntax: object
}

export default function Preview({ styledName, nameSyntax }: Props) {
  const parseStyledName = (input: string) => {
    const regex = /\$(\w{3})(.)/g; // Matches $<color><letter>
    const elements: JSX.Element[] = [];
    let match;

    for(let i = 0; i < input.length; i++) {
      let letter = input[i];
      let color = nameSyntax.color[0].code 
      // const [_, color, letter] = match;
      elements.push(
        <span key={elements.length} style={{ color: `#${color}` }}>
          {letter}
        </span>
      );
    }

    return elements;
  };

  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">Preview:</p>
      <div className="bg-gray-900 p-4 rounded border border-gray-700">
        {styledName ? parseStyledName(styledName) : "<empty>"}
      </div>
    </div>
  )
}
