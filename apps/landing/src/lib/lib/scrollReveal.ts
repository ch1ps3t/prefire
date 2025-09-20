export function initRevealOnScroll(options?: {
	selector?: string;
	once?: boolean;
	root?: Element | Document | null;
	rootMargin?: string;
	threshold?: number | number[];
}) {
	const {
		selector = '.reveal-fadeup',
		once = true,
		root = null,
		rootMargin = '0px 0px -10% 0px',
		threshold = 0.2
	} = options ?? {};

	const elements = Array.from(document.querySelectorAll(selector));
	if (elements.length === 0) return;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('in-view');
					if (once) observer.unobserve(entry.target);
				}
			}
		},
		{ root, rootMargin, threshold }
	);

	for (const el of elements) observer.observe(el);
	return () => observer.disconnect();
}
