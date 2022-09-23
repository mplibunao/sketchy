import {
	Bars3Icon,
	CalendarIcon,
	HomeIcon,
	MagnifyingGlassCircleIcon,
	MapIcon,
	MegaphoneIcon,
	UserGroupIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

const navigation = [
	{ name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
	{ name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
	{ name: 'Teams', href: '#', icon: UserGroupIcon, current: false },
	{
		name: 'Directory',
		href: '#',
		icon: MagnifyingGlassCircleIcon,
		current: false,
	},
	{ name: 'Announcements', href: '#', icon: MegaphoneIcon, current: false },
	{ name: 'Office Map', href: '#', icon: MapIcon, current: false },
]

interface LayoutProps {
	children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
	return <div className='h-full'>{children}</div>
}

//export const Layout = ({ children }: { children: React.ReactNode }) => {
//return (
//<div className='h-full flex'>
//[> Static sidebar for desktop <]
//<div className='flex w-64 flex-col'>
//[> Sidebar component, swap this element with another sidebar if you like <]
//<div className='flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100'>
//<div className='flex flex-1 flex-col overflow-y-auto pt-5 pb-4'>
//<div className='flex flex-shrink-0 items-center px-4'>
//<img
//className='h-8 w-auto'
//src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
//alt='Your Company'
///>
//</div>
//<nav className='mt-5 flex-1' aria-label='Sidebar'>
//<div className='space-y-1 px-2'>
//{navigation.map((item) => (
//<a
//key={item.name}
//href={item.href}
//className={clsx(
//item.current
//? 'bg-gray-200 text-gray-900'
//: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
//'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
//)}
//>
//<item.icon
//className={clsx(
//item.current
//? 'text-gray-500'
//: 'text-gray-400 group-hover:text-gray-500',
//'mr-3 h-6 w-6'
//)}
//aria-hidden='true'
///>
//{item.name}
//</a>
//))}
//</div>
//</nav>
//</div>
//</div>
//</div>

//<div className='h-full flex flex-1 flex-col'>
//<div className='h-full rounded-lg border-2 border-dashed border-gray-200'>
//{children}
//</div>
//</div>
//</div>
//)
//}
