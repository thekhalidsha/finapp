import React, { useState } from 'react';
import { CircleCheck, CloudDownload, CloudUpload } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { eraseAll, importData } from '../redux/reducers/financeReducer';

const LocalStorageActions = () => {
    const data = useSelector((state) => { return state.finance });
    const [ImportBtn, setImportBtn] = useState(<><CloudDownload /> Import from LocalStorage</>);
    const [ExportBtn, setExportBtn] = useState(<><CloudUpload /> Export to LocalStorage</>);
    const dispatch = useDispatch();


    const ExportLocal = () => {
        if (data.length <= 0) {
            alert("Nothing to Export!");
        } else {
            console.log(data.length);
            if (confirm('LocalStorage will be overwritten! Proceed? ')) {
                localStorage.setItem('findata', JSON.stringify(data));
                setExportBtn(
                    <>
                        <div className="fill-animation h-full bg-blue-700 rounded absolute top-0 left-0 z-0"></div>
                        <div className=' z-10 w-full flex gap-2'>Successfully Exported <CircleCheck /></div>
                    </>
                );
                setTimeout(() => {
                    setExportBtn(<><CloudUpload /> Export to LocalStorage</>)
                }, 2100);
            }
        }
    };

    const ImportLocal = () => {
        var data = '';
        localStorage.getItem('findata') ? data = localStorage.getItem('findata') : data = false;
        if (!data) {
            alert("Nothing to Import!");
        } else {
            if (confirm('Existing Data will be overwritten! Proceed?')) {
                // console.log(JSON.parse(data))
                dispatch(importData(JSON.parse(data)));
                setImportBtn(
                    <>
                        <div className="fill-animation h-full bg-green-700 rounded absolute top-0 left-0 z-0"></div>
                        <div className=' z-10 w-full flex gap-2'>Successfully Imported <CircleCheck /></div>
                    </>
                );
                setTimeout(() => {
                    setImportBtn(<><CloudDownload /> Import from LocalStorage</>)
                }, 2100);
            }
        }
    };

    return (
        <>
            <div className='p-4 mx-2 md:mx-auto gap-2 my-2 bg-blue-100 dark:bg-gray-600 rounded-lg text-center w-full flex flex-col md:flex-row justify-around'>
                <button onClick={ImportLocal} className='relative items-center px-2 py-4 flex gap-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer text-center'>
                    {ImportBtn}
                </button>
                {/* <button className='flex gap-2 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 cursor-pointer text-center'><Trash2 /> Delete LocalStorage</button> */}
                <button onClick={ExportLocal} className='relative flex gap-2 items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer text-center'>
                    {ExportBtn}
                </button>
            </div>
        </>
    );
};

export default LocalStorageActions;
