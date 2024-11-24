import { Dispatch, SetStateAction, useRef } from "react";

const Params = ({
  setType,
  setValue,
}: {
  setType: Dispatch<SetStateAction<string>>;
  setValue: Dispatch<SetStateAction<number>>;
}) => {
  const whichValRef = useRef<HTMLSelectElement>(null);
  const topRef = {
    isRoot: useRef<HTMLInputElement>(null),
    value: useRef<HTMLInputElement>(null),
  };

  const bottomRef = {
    isRoot: useRef<HTMLInputElement>(null),
    value: useRef<HTMLInputElement>(null),
  };

  const handleClick = () => {
    const type = whichValRef.current!.value;

    const topVal = topRef.isRoot.current!.checked
      ? Math.sqrt(Number(topRef.value.current!.value))
      : Number(topRef.value.current!.value);

    const bottomVal = bottomRef.isRoot.current!.checked
      ? Math.sqrt(Number(bottomRef.value.current!.value))
      : Number(bottomRef.value.current!.value);

    setType(type);
    setValue(topVal / bottomVal);
  };

  return (
    <div className='text-center'>
      <div className='flex justify-center items-center'>
        <select className='text-xl p-2 m-3' name='' id='' ref={whichValRef}>
          <option value='sin'>sin</option>
          <option value='cos'>cos</option>
          <option value='tan'>tan</option>
        </select>

        <div id='fraction'>
          <div className='flex'>
            Root?
            <input
              type='checkbox'
              ref={topRef.isRoot}
              className='p-2 text-lg max-w-[100px] m-2'
            />
            <input
              type='number'
              ref={topRef.value}
              className='p-2 text-lg max-w-[100px] m-2'
            />
          </div>
          <div className='border-2 border-black'></div>
          <div className='flex'>
            Root?
            <input
              type='checkbox'
              ref={bottomRef.isRoot}
              className='p-2 text-lg max-w-[100px] m-2'
            />
            <input
              type='number'
              ref={bottomRef.value}
              className='p-2 text-lg max-w-[100px] m-2'
            />
          </div>
        </div>
      </div>

      <button onClick={handleClick} className='text-center px-4 py-2 text-xl'>
        描画
      </button>
    </div>
  );
};

export default Params;
