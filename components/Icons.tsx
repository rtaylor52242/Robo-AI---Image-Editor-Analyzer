
import React from 'react';

type IconProps = React.HTMLAttributes<SVGElement>;

export const UploadIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

export const EditIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 012.829-5.195l2.422-1.135a4.5 4.5 0 002.16-6.323l-1.63-3.26a4.5 4.5 0 00-6.323 2.161L7.5 12.5a4.5 4.5 0 01-5.196 2.829l-2.846-.813A4.5 4.5 0 002.25 18L5.005 21a4.5 4.5 0 006.323-2.161l1.135-2.422a4.5 4.5 0 00-2.829-5.195z" />
  </svg>
);

export const AnalyzeIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
  </svg>
);

export const EnhanceIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 1 2.829-5.195l2.422-1.135a4.5 4.5 0 0 0 2.16-6.323l-1.63-3.26a4.5 4.5 0 0 0-6.323 2.161L7.5 12.5a4.5 4.5 0 0 1-5.196 2.829L.25 15.375A4.5 4.5 0 0 0 2.25 21l3.51-1.036a4.5 4.5 0 0 0 4.053-4.053z" />
    </svg>
);

export const DownloadIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const RoboLogo = (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A855F7" />
                <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
        </defs>
        <path d="M5 10V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V10" stroke="url(#paint0_linear_1_2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10" stroke="url(#paint0_linear_1_2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 14C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14Z" fill="url(#paint0_linear_1_2)" />
        <path d="M15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12C14.4477 12 14 12.4477 14 13C14 13.5523 14.4477 14 15 14Z" fill="url(#paint0_linear_1_2)" />
        <path d="M12 7V3" stroke="url(#paint0_linear_1_2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const QuestionMarkIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
