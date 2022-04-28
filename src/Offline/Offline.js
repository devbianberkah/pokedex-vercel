import cx from 'classnames';
import { useEffect } from 'react';
import { useBooleanState, usePrevious } from 'webrix/hooks';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default function Offline({children}){
    const {value:online,setFalse:setOffline, setTrue:setOnline } = useBooleanState(navigator.online);
    const previousOnline = usePrevious(online);

    
  useEffect(() => {
    if (!online) { return void disableBodyScroll(document.body); }

    enableBodyScroll(document.body);
    }, [online]);


    useEffect(()=>{
        window.addEventListener('online',setOnline);
        window.addEventListener('offline',setOffline);

        return ()=>{
            window.removeEventListener('online', setOnline);
            window.removeEventListener('offline', setOffline);
        }
    },[]);

    return (
        <>
        <div
				className={cx(
					'offline',
					'animate__animated',
					'animate__faster',
					`animate__${online ? 'slideOutUp' : 'slideInDown'}`
				)}
				style={previousOnline === online && online ? { display: 'none' } : void 0}
			>
			
            <div className='offline__content'>
                <div className='offline__text'>
                    <h1>Sedang Offline</h1>
                </div>
            </div>
        </div>
            <div className={cx("offline__overlay")} />
                {children}
        </>
    )
}