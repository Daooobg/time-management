import { SvgType } from './types';

export default function PasswordSvg({ width = 31, height = 31, color = '#568DB6' }: SvgType) {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 31 31'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <g id='ph:password-bold'>
                <path
                    id='Vector'
                    d='M5.8125 6.78125V24.2188C5.8125 24.6041 5.6594 24.9737 5.38689 25.2463C5.11438 25.5188 4.74477 25.6719 4.35938 25.6719C3.97398 25.6719 3.60437 25.5188 3.33186 25.2463C3.05935 24.9737 2.90625 24.6041 2.90625 24.2188V6.78125C2.90625 6.39586 3.05935 6.02625 3.33186 5.75374C3.60437 5.48122 3.97398 5.32812 4.35938 5.32812C4.74477 5.32812 5.11438 5.48122 5.38689 5.75374C5.6594 6.02625 5.8125 6.39586 5.8125 6.78125ZM16.315 12.9207L14.5312 13.4995V11.625C14.5312 11.2396 14.3782 10.87 14.1056 10.5975C13.8331 10.325 13.4635 10.1719 13.0781 10.1719C12.6927 10.1719 12.3231 10.325 12.0506 10.5975C11.7781 10.87 11.625 11.2396 11.625 11.625V13.4995L9.84129 12.9207C9.65847 12.8564 9.46464 12.8293 9.2712 12.841C9.07776 12.8527 8.88862 12.903 8.7149 12.9889C8.54119 13.0749 8.38642 13.1947 8.25969 13.3413C8.13297 13.4879 8.03685 13.6584 7.977 13.8427C7.91714 14.027 7.89477 14.2215 7.91118 14.4146C7.92759 14.6077 7.98246 14.7955 8.07257 14.9671C8.16267 15.1387 8.28618 15.2905 8.43584 15.4136C8.58549 15.5368 8.75826 15.6287 8.94398 15.6841L10.7265 16.2641L9.62453 17.7802C9.39795 18.092 9.30453 18.4811 9.36483 18.8618C9.42512 19.2426 9.63419 19.5838 9.94604 19.8103C10.2579 20.0369 10.647 20.1303 11.0277 20.07C11.4084 20.0097 11.7496 19.8007 11.9762 19.4888L13.0781 17.9727L14.1801 19.4888C14.4067 19.8007 14.7478 20.0097 15.1286 20.07C15.5093 20.1303 15.8984 20.0369 16.2102 19.8103C16.5221 19.5838 16.7311 19.2426 16.7914 18.8618C16.8517 18.4811 16.7583 18.092 16.5317 17.7802L15.4298 16.2641L17.2123 15.6841C17.398 15.6287 17.5708 15.5368 17.7204 15.4136C17.8701 15.2905 17.9936 15.1387 18.0837 14.9671C18.1738 14.7955 18.2287 14.6077 18.2451 14.4146C18.2615 14.2215 18.2391 14.027 18.1793 13.8427C18.1194 13.6584 18.0233 13.4879 17.8966 13.3413C17.7698 13.1947 17.6151 13.0749 17.4413 12.9889C17.2676 12.903 17.0785 12.8527 16.885 12.841C16.6916 12.8293 16.4978 12.8564 16.315 12.9207ZM30.2553 13.8531C30.1361 13.4867 29.8762 13.1827 29.5329 13.0078C29.1895 12.8329 28.7908 12.8016 28.4243 12.9207L26.6406 13.4995V11.625C26.6406 11.2396 26.4875 10.87 26.215 10.5975C25.9425 10.325 25.5729 10.1719 25.1875 10.1719C24.8021 10.1719 24.4325 10.325 24.16 10.5975C23.8875 10.87 23.7344 11.2396 23.7344 11.625V13.4995L21.9507 12.9207C21.7678 12.8564 21.574 12.8293 21.3806 12.841C21.1871 12.8527 20.998 12.903 20.8243 12.9889C20.6506 13.0749 20.4958 13.1947 20.3691 13.3413C20.2423 13.4879 20.1462 13.6584 20.0864 13.8427C20.0265 14.027 20.0041 14.2215 20.0206 14.4146C20.037 14.6077 20.0918 14.7955 20.1819 14.9671C20.272 15.1387 20.3956 15.2905 20.5452 15.4136C20.6949 15.5368 20.8676 15.6287 21.0534 15.6841L22.8359 16.2641L21.7339 17.7802C21.6217 17.9346 21.541 18.1096 21.4965 18.2952C21.4519 18.4808 21.4443 18.6733 21.4742 18.8618C21.5041 19.0504 21.5708 19.2312 21.6705 19.3939C21.7702 19.5566 21.901 19.6981 22.0554 19.8103C22.2098 19.9225 22.3848 20.0032 22.5704 20.0478C22.756 20.0923 22.9485 20.0999 23.1371 20.07C23.3256 20.0402 23.5064 19.9735 23.6691 19.8738C23.8319 19.774 23.9734 19.6432 24.0855 19.4888L25.1875 17.9727L26.2895 19.4888C26.516 19.8007 26.8572 20.0097 27.2379 20.07C27.6187 20.1303 28.0077 20.0369 28.3196 19.8103C28.6314 19.5838 28.8405 19.2426 28.9008 18.8618C28.9611 18.4811 28.8677 18.092 28.6411 17.7802L27.5391 16.2641L29.3216 15.6841C29.5032 15.6252 29.6713 15.5311 29.8165 15.4072C29.9617 15.2833 30.081 15.132 30.1677 14.962C30.2544 14.792 30.3068 14.6065 30.3218 14.4163C30.3368 14.226 30.3142 14.0346 30.2553 13.8531Z'
                    fill={color}
                />
            </g>
        </svg>
    );
}
