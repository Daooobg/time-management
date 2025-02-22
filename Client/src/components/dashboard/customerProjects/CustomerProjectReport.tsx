import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

import mainLogo from '@/assets/timeManagementLogo.png';
import useFetchGeneratedReports from '@/reactQuery/hooks/useFetchGeneratedReports';
import useFetchProjectById from '@/reactQuery/hooks/useFetchProjectById';
import Loader from '@/UI/Loader';

export default function CustomerProjectReport() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { generatedReports, isFetching } = useFetchGeneratedReports(id);
    const { data: project } = useFetchProjectById(id!);

    return (
        <div>
            <div className='flex items-center justify-center'>
                <img src={mainLogo} className='m-0 mr-[-75px] scale-35' />
                <h1 className='ml-3 font-mavenPro text-5xl font-medium text-welcomeMsgColor'>
                    OpsHero
                </h1>
            </div>

            {isFetching ? (
                <div className='absolute right-1/2 top-0'>
                    <Loader />
                </div>
            ) : (
                <>
                    <div className='relative m-auto mb-8 w-3/4 font-medium text-customBlue'>
                        <div className='flex'>
                            <p className='min-w-[150px]'>Employee(s):</p>
                            <span className='ml-2 capitalize text-customDarkBlue'>
                                {[
                                    ...new Set(
                                        project?.employeeIds.map(
                                            (person) => `${person.firstName} ${person.lastName}`
                                        )
                                    ),
                                ].join(', ')}
                            </span>
                        </div>
                        <div className='flex'>
                            <p className='min-w-[150px]'>Client(s):</p>
                            <span className='ml-2 capitalize text-customDarkBlue'>
                                {[
                                    ...new Set(
                                        project?.customerIds.map(
                                            (person) => `${person.firstName} ${person.lastName}`
                                        )
                                    ),
                                ].join(', ')}
                            </span>
                        </div>
                        <div className='flex'>
                            <p className='min-w-[150px]'>Project Name:</p>
                            <span className='ml-2 text-customDarkBlue'>{project?.projectName}</span>
                        </div>
                    </div>

                    <div className='m-auto w-3/4 overflow-hidden rounded-2xl border shadow-lg'>
                        <table className='w-full'>
                            <thead>
                                <tr className='bg-customBlue text-white'>
                                    <th scope='col' className='w-32 p-4 text-left'>
                                        From
                                    </th>
                                    <th scope='col' className='w-32 p-4 text-left'>
                                        To
                                    </th>
                                    <th scope='col' className='p-4 text-left'>
                                        Name
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {generatedReports && generatedReports.reports.length > 0 ? (
                                    generatedReports.reports.map((report, index) => (
                                        <tr
                                            key={index}
                                            onClick={() => navigate(`/reports/${report._id}`)}
                                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-customDarkTableGrey shadow-TrInsetShadow'} min-h-12 cursor-pointer`}
                                        >
                                            <td className='w-32 p-4 text-base font-bold text-customDarkBlue'>
                                                {dayjs(report.startDate).format('DD.MM.YYYY')}
                                            </td>
                                            <td className='w-32 p-4 text-base font-bold text-customDarkBlue'>
                                                {dayjs(report.endDate).format('DD.MM.YYYY')}
                                            </td>
                                            <td className='p-4 text-base font-bold text-customDarkBlue'>
                                                {report.name}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className='p-4 text-center text-base font-bold text-customDarkBlue '
                                        >
                                            No reports are available for this project. Please check
                                            back later.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
