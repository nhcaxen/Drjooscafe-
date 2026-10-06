import React from 'react';

interface DrJoosLogoProps {
  className?: string;
}

export const DrJoosLogo: React.FC<DrJoosLogoProps> = ({ className = 'h-10 w-auto' }) => {
  return (
    <svg
      viewBox="0 0 280 145"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible select-none`}
    >
      <defs>
        {/* Drop shadow filter for bold branding depth */}
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.12" />
        </filter>
      </defs>

      <g filter="url(#logoShadow)">
        {/* ======================================================== */}
        {/* 1. PINK PARASOL / BEACH UMBRELLA & STRAW & ORANGE SLICE */}
        {/* ======================================================== */}

        {/* Straw (Pink cocktail straw dipping into orange slice) */}
        <path
          d="M131 43L126 68"
          stroke="#E6007A"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M131 43L126 68"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Juicy Orange Half Slice */}
        <g id="orange-slice">
          {/* Orange Outer Peel (Yellow-Orange) */}
          <path
            d="M106 63C106 50 119 44 129 45C136 46 142 51 142 61L106 63Z"
            fill="#FFA000"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Orange Inner Pulp (Vibrant Orange) */}
          <path
            d="M109 61.5C109 52 119 47 127 48C133 49 138 53 138 60.5L109 61.5Z"
            fill="#FF6D00"
          />
          {/* Orange Pulp Segments & White Pith */}
          <path d="M123 60L112 56" stroke="#FFE082" strokeWidth="1.2" />
          <path d="M123 60L116 51" stroke="#FFE082" strokeWidth="1.2" />
          <path d="M123 60L124 49" stroke="#FFE082" strokeWidth="1.2" />
          <path d="M123 60L131 51" stroke="#FFE082" strokeWidth="1.2" />
          <path d="M123 60L135 56" stroke="#FFE082" strokeWidth="1.2" />
          <circle cx="123" cy="60" r="1.5" fill="#FFE082" />
        </g>

        {/* Parasol Finial (Top Button) */}
        <path
          d="M137 41L141 38C142 37 144 38 143 40L140 43"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="#E6007A"
        />
        <circle cx="140" cy="40" r="3.5" fill="#E6007A" stroke="#000000" strokeWidth="2.2" />

        {/* Umbrella Dome Canopy */}
        <g id="umbrella">
          {/* Outer Black Outline of Entire Canopy */}
          <path
            d="M74 53C93 42 121 39 140 43C158 48 172 61 179 70C167 67 155 68 147 72C136 67 122 66 112 70C101 64 87 62 74 53Z"
            fill="#E6007A"
            stroke="#000000"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Left Segment */}
          <path
            d="M75 53C85 47 98 44 112 43C104 53 99 62 97 68C89 64 81 60 75 53Z"
            fill="#E6007A"
          />
          {/* Left Rib White Arc */}
          <path
            d="M140 43C121 47 107 58 97 68"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Right Rib White Arc */}
          <path
            d="M140 43C148 51 155 61 158 70"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Umbrella Highlight Sheen */}
          <path
            d="M115 45C125 43 135 44 142 47"
            stroke="#FF80AB"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* ======================================================== */}
        {/* 2. "Dr." IN RETRO LIME GREEN WITH BLACK OUTLINE & DOTS   */}
        {/* ======================================================== */}
        <g id="dr-group">
          {/* Big "D" Letter Silhouette */}
          <path
            d="M20 62C20 60 22 58 25 58H58C73 58 84 66 84 76C84 83 80 88 74 91C68 94 60 95 49 95H25C22 95 20 93 20 90V62Z"
            fill="#98CD12"
            stroke="#000000"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* "D" Inner Hole / Counter */}
          <path
            d="M45 68H54C62 68 67 71 67 76C67 81 62 84 54 84H45V68Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* D Top-Left 6 Dots Motif */}
          <circle cx="27" cy="65" r="1.6" fill="#000000" />
          <circle cx="32" cy="65" r="1.6" fill="#000000" />
          <circle cx="37" cy="65" r="1.6" fill="#000000" />
          <circle cx="29" cy="70" r="1.6" fill="#000000" />
          <circle cx="34" cy="70" r="1.6" fill="#000000" />
          <circle cx="31" cy="75" r="1.6" fill="#000000" />

          {/* D Bottom-Left Screw / Eyelet Motif */}
          <circle cx="29" cy="87" r="3.2" fill="#98CD12" stroke="#000000" strokeWidth="1.8" />
          <circle cx="29" cy="87" r="1" fill="#000000" />

          {/* Lowercase "r" in Lime Green */}
          <path
            d="M87 74C87 71 89 69 92 69C95 69 97 71 97 74V89C97 92 95 94 92 94C89 94 87 92 87 89V74Z"
            fill="#98CD12"
            stroke="#000000"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* "r" shoulder branch */}
          <path
            d="M93 72C97 68 103 68 108 71C110 72 109 76 106 77C102 75 97 76 94 80"
            fill="#98CD12"
            stroke="#000000"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Dot "." */}
          <circle
            cx="97"
            cy="90"
            r="3.5"
            fill="#98CD12"
            stroke="#000000"
            strokeWidth="2.5"
          />
        </g>

        {/* ======================================================== */}
        {/* 3. "Joos" IN BUBBLE HOT PINK WITH BOLD BLACK & WHITE OUTLINE */}
        {/* ======================================================== */}
        <g id="joos-group">
          {/* White Glow / Outer Border layer */}
          <g stroke="#FFFFFF" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" opacity="0.95">
            {/* J White Outline */}
            <path d="M120 70V96C120 106 112 113 100 113C91 113 83 107 83 99C83 93 88 89 93 90C98 91 100 95 100 98C100 100 102 102 105 102C109 102 111 99 111 94V70H120Z" />
            {/* First 'o' White Outline */}
            <ellipse cx="147" cy="84" rx="16" ry="17" />
            {/* Second 'o' White Outline */}
            <ellipse cx="178" cy="83" rx="16" ry="17" />
            {/* 's' White Outline */}
            <path d="M217 76C215 72 209 69 204 70C198 71 195 75 196 80C197 85 204 87 209 89C215 91 219 95 218 100C217 106 209 109 202 109C195 109 190 105 189 101" />
          </g>

          {/* Letter "J" */}
          <path
            d="M117 68V95C117 105 110 113 99 113C90 113 82 106 82 98C82 91 88 87 94 88C99 89 101 93 101 96C101 99 103 101 106 101C109 101 111 98 111 93V68H138C142 68 142 74 138 74H125V68H117Z"
            fill="#E6007A"
            stroke="#000000"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* First "o" */}
          <g>
            <ellipse
              cx="147"
              cy="84"
              rx="15"
              ry="16.5"
              fill="#E6007A"
              stroke="#000000"
              strokeWidth="4"
            />
            {/* Hole */}
            <ellipse cx="147" cy="84" rx="5.5" ry="7.5" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />
          </g>

          {/* Second "o" */}
          <g>
            <ellipse
              cx="178"
              cy="83"
              rx="15"
              ry="16.5"
              fill="#E6007A"
              stroke="#000000"
              strokeWidth="4"
            />
            {/* Hole */}
            <ellipse cx="178" cy="83" rx="5.5" ry="7.5" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />
          </g>

          {/* Letter "s" */}
          <path
            d="M228 77C226 71 219 67 212 68C204 69 199 74 200 81C201 87 209 89 216 92C223 95 226 99 225 105C224 112 214 116 206 116C197 116 190 111 189 105C188 100 193 98 196 99C199 100 200 104 202 106C203 108 206 109 209 109C213 109 216 107 217 103C218 99 214 96 208 94C201 91 193 88 192 81C191 73 198 65 208 64C217 63 227 67 229 74C230 78 226 80 223 79C221 78 220 76 219 75L228 77Z"
            fill="#E6007A"
            stroke="#000000"
            strokeWidth="3.6"
            strokeLinejoin="round"
          />

          {/* Bubble highlight shine accents */}
          <path d="M141 73C143 71 148 70 152 71" stroke="#FF80AB" strokeWidth="2" strokeLinecap="round" />
          <path d="M172 72C174 70 179 69 183 70" stroke="#FF80AB" strokeWidth="2" strokeLinecap="round" />
          <path d="M208 67C211 66 215 67 217 69" stroke="#FF80AB" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* ======================================================== */}
        {/* 4. "café" IN VIBRANT BUBBLE ORANGE WITH BLACK OUTLINE     */}
        {/* ======================================================== */}
        <g id="cafe-group" transform="translate(195, 96)">
          {/* 'c' */}
          <path
            d="M17 19C15 15 10 14 6 16C2 18 0 23 2 28C4 33 9 35 14 34C17 33 19 31 19 28C19 26 17 25 15 26C13 27 11 27 9 26C6 24 5 21 6 18C7 16 9 15 12 15C14 15 16 16 16 18L17 19Z"
            fill="#FF6D00"
            stroke="#000000"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* 'a' */}
          <path
            d="M23 23C23 19 27 16 32 16C36 16 39 18 39 22V32C39 34 40 35 41 35H42C43 35 44 36 44 37C44 38 43 39 41 39C38 39 35 37 35 34C33 36 30 37 27 37C22 37 19 34 19 29C19 24 23 22 28 22H34V21C34 19 32 18 30 18C27 18 25 19 25 21C25 23 23 24 21 23L23 23ZM34 26H28C25 26 23 28 23 30C23 32 25 33 28 33C31 33 34 31 34 28V26Z"
            fill="#FF6D00"
            stroke="#000000"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* 'f' */}
          <path
            d="M48 14C48 11 51 9 55 9C58 9 60 10 61 12C61 14 59 15 57 15C55 15 54 15 54 17V20H59C60 20 61 21 61 22C61 23 60 24 59 24H54V36C54 38 52 39 50 39C48 39 46 38 46 36V24H43C42 24 41 23 41 22C41 21 42 20 43 20H46V17C46 15 47 14 48 14Z"
            fill="#FF6D00"
            stroke="#000000"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* 'é' */}
          <path
            d="M66 26C66 21 70 17 76 17C81 17 85 20 85 25C85 27 84 27 82 27H70C70 30 73 33 77 33C80 33 82 32 83 30C84 29 86 29 87 30C88 31 87 33 85 35C83 37 79 38 75 38C69 38 65 34 65 28L66 26ZM79 23C79 20 77 19 75 19C72 19 70 21 70 23H79Z"
            fill="#FF6D00"
            stroke="#000000"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* Accent over 'é' */}
          <path
            d="M78 10L73 14"
            stroke="#000000"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M78 10L73 14"
            stroke="#FF6D00"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
};
