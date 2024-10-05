import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	integrations: [starlight({
		title: 'Bam Library',
		social: {
			github: 'https://github.com/willy874/bam-library',
		},
		sidebar: [
			{
				label: 'About',
				autogenerate: { directory: 'about' },
			},
			{
				label: 'Guides',
				items: [
					{ label: 'Getting Started', slug: 'guides/get_started' },
				],
			},
			{
				label: 'Config',
				items: [
					{ label: 'Getting Started', slug: 'config/example' },
				],
			},
			{
				label: 'Components',
        items: [
					{
						label: 'General',
						items: [
							{ label: 'Button', slug: 'components/general/button' },
						],
					},
					{
						label: 'Layout',
						items: [
							{ label: 'Flex', slug: 'components/layout/flex' },
						],
					},
					{
						label: 'Form',
						items: [
							{ label: 'Checkbox', slug: 'components/form/checkbox' },
						],
					},
					{
						label: 'Navigation',
						items: [
							{ label: 'Navbar', slug: 'components/navigation/navbar' },
						],
					},
					{
						label: 'Data',
						items: [
							{ label: 'Date Picker', slug: 'components/data/date_picker' },
						],
					},
					{
						label: 'Feedback',
						items: [
							{ label: 'Alert', slug: 'components/feedback/alert' },
						],
					},
					{
						label: 'Other',
						items: [
							{ label: '', slug: '' },
						],
					},
				],
			},
		],
	}), tailwind()],
});
