
function SearchCardSmCard({ cardObj }) {
    return (
        <div className='wrapped-cardObj-sm'>
            {/* main images */}
            <img src={cardObj.cardImageUrl} alt="card" className="wrapped-cardObj-sm-card-img" />
            <img src={cardObj.headshotUrl} alt="headimg" className="wrapped-cardObj-sm-player-img" />

            {/* name, numbers */}
            <div className='ovr-position-container-sm'>
                <p className='ovr-text-in-card-sm'
                    style={{ color: cardObj?.ovrFontHex }}
                >
                    {cardObj?.ovr}
                </p>
                <p className='position-text-in-card-sm'
                    style={{ color: cardObj?.posFontHex }}
                >
                    {cardObj?.position}
                </p>
            </div>

            {/* name */}
            <p className='player-name-in-card-sm'
                style={{ color: cardObj?.nameFontHex }}
            >
                {cardObj?.name?.split(' ')[0]}
            </p>

            <div className='flag-main-container-sm'>
                <img src={cardObj?.nationFlagUrl} alt="flag1" className='flag-common-css-sm' />
                {cardObj?.cardType !== 'ICON' && < img src={cardObj?.leagueCrestUrl} alt="flag2" className='flag-common-css-sm' />}

                <img src={cardObj?.clubLogoUrl} alt="flag3" className='flag-common-css-sm' />
            </div>
        </div>
    )
}

export default SearchCardSmCard
