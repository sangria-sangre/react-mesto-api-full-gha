export function renderLoading(isLoading, elementSelector) {
    const popup = document.querySelector(elementSelector);
    const btn = popup.querySelector('.popup__btn-default-name');
    const loading = popup.querySelector('.popup__loading');
    if (isLoading) {
        btn.classList.add('popup__btn-default-name_disable');
        loading.classList.add('popup__loading_active');
    } else {
        btn.classList.remove('popup__btn-default-name_disable');
        loading.classList.remove('popup__loading_active')
    }
}