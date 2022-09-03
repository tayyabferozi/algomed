const handleMessageChange = (event) => {};

export const SuggestingTextbox = ({ dataTarget, title }) => {
  return (
    <div className="mt-[20px]" data-target={dataTarget}>
      <h6 className="font-bold mb-[4px]">{title}</h6>
      <textarea
        class="
                form-control
                block
                w-full
                h-50
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:outline-none
                "
        id="HPI"
        rows="3"
        placeholder="Type HPI in this box..."
        name="HPI"
        onChange={handleMessageChange}
      ></textarea>
    </div>
  );
};
