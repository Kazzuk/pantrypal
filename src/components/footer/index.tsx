import { SoupIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer bottom-0 left-0 right-0 items-center bg-neutral p-4 text-neutral-content">
      <aside className="grid-flow-col items-center">
        <p>
          <span className="font-bold">
            <SoupIcon className="mr-1 inline h-4 w-4 text-white" />
            pantrypal
          </span>{' '}
          | Copyright © 2024 - All right reserved
        </p>
      </aside>
    </footer>
  );
}
