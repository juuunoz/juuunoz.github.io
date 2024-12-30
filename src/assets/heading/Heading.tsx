//TODO: Figure out how to lock this to navbar, so vertical resizing doesn't break everything
function Heading() {
    return(
    <div className='flex justify-center'>
        <div className=' absolute w-[800px] mx-auto top-1/4 text-center'> 
            <div className='text-center p-5'>
                <h1 className='text-8xl font-bold text-white mb-5' id='header'>JUNO ZHANG</h1>
            </div>
            <div className='text-center text-xl p-5 m-5 ml-10 mr-10 mt-10'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
        </div>
    </div>
    )
}

export default Heading