type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
    logo: (props: IconProps) => (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="12" x2="16" y2="8" />
            <polyline points="8 12 12 16 16 12" />
        </svg>
    ),
    quiz: (props: IconProps) => (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <rect x="17" y="2" width="2" height="20" />
        <line x1="5" y1="12" x2="19" y2="12" />
        <line x1="5" y1="6" x2="19" y2="6" />
        <line x1="5" y1="18" x2="16" y2="18" />
      </svg>
      

    )
};
