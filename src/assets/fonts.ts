import localFont from '@next/font/local'

export const poppinFont = localFont({
    src: [
        {
            path: '../../public/fonts/Poppins-Light.ttf',
            weight: '200',
            style: 'base'
        },
        {
            path: '../../public/fonts/Poppins-Regular.ttf',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../../public/fonts/Poppins-Medium.ttf',
            weight: '500',
            style: 'medium'
        },
        {
            path: '../../public/fonts/Poppins-SemiBold.ttf',
            weight: '600',
            style: 'semi-bold'
        },
        {
            path: '../../public/fonts/Poppins-Bold.ttf',
            weight: '700',
        },
        {
            path: '../../public/fonts/Poppins-ExtraBold.ttf',
            weight: '800',
        }
    ]
})

