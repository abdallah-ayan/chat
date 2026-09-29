function MessagesLoadingSkeleton() {
    return (
        <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto space-y-4">

                {[...Array(8)].map((_, index) => {
                    return index % 2 === 0 ? (
                        <div key={index} className="flex justify-end">
                            <div className="relative h-20 w-60 max-w-[400px] animate-pulse rounded-[18px_18px_4px_18px] bg-[#263449]">
                                <span className="absolute bottom-0 right-[-10px] h-6 w-4 bg-[#263449] [clip-path:polygon(0_0,0_100%,100%_100%)]" />
                            </div>
                        </div>
                    ) : (
                        <div key={index} className="flex justify-start">
                            <div className="relative h-20 w-60 max-w-[400px] animate-pulse rounded-[18px_18px_18px_4px] bg-[#263449]">
                                <span className="absolute bottom-0 left-[-10px] h-6 w-4 bg-[#263449] [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default MessagesLoadingSkeleton;