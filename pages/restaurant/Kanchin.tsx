import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { RestaurantDetailModel } from '@/functions/swagger/ExamNextJsBackEnd';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import { Page } from '@/types/Page';
import {  faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSwr from 'swr';

const RestaurantDetailTableRow: React.FC<{
    restaurant: RestaurantDetailModel,
}> = ({ restaurant }) => {

    return (
        <tr>
            <td className="border px-4 py-2">{restaurant.foodName}</td>
            <td className="border px-4 py-2">{restaurant.foodPrice}</td>
        </tr>
    );
};

const IndexPage: Page = () => {
    const router = useRouter();
    const {id} = router.query;
    const restaurantDetailUri = id ? `/api/be/api/Restaurants/${id}` : undefined;
    const swrFetcher = useSwrFetcherWithAccessToken();
    const { data, error } = useSwr<RestaurantDetailModel[]>(restaurantDetailUri, swrFetcher);

    return (
        <div>
            <Link href='/restaurant'>Return to Restaurant?</Link>
            <Title>Welcome to Kanchin!</Title>
            <h2 className='mb-5 text-3xl'>Welcome to Kanchin!</h2>
            <div>
                <Link href='/restaurant/orderKanchin' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block'>
                    <FontAwesomeIcon icon={faPlus} className='mr-2'></FontAwesomeIcon>
                    Order Kanchin
                </Link>
            </div>

            {Boolean(error) && <Alert type='error' message='Cannot get menus data' description={String(error)}></Alert>}
            <table className='table-auto mt-5'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((x, i) => <RestaurantDetailTableRow key={i} restaurant={x}></RestaurantDetailTableRow>)}
                </tbody>
            </table>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;

