export function renderPost(post, optionBtn = {}) {
    const tag = post.type === 'news'
        ? '<li class="tag tag-blue tag-rounded">Новина</li>'
        : '<li class="tag tag-rounded">Замітка</li>'

    const button = (JSON.parse(localStorage.getItem('favorites')) || []).some(fid => fid.id === post.id)
        ? `<button class="button-danger button-round button-small button-shadow" data-id="${post.id}" data-title="${post.title}">Видалити</button>`
        : `<button class="button-primary button-round button-small button-shadow" data-id="${post.id}" data-title="${post.title}">Зберегти</button>`

    return `
        <div class="panel">
            <div class="panel-head">
                <p class="panel-title">${post.title}</p>
                <ul class="tags">
                    ${tag}
                </ul>
            </div>
            
            <div class="panel-body">
                <p class="multi-line">${post.fulltext}</p>
            </div>
            
            <div class="panel-footer w-panel-footer">
                <small>${post.date}</small>
                ${optionBtn.withBtn ? button : ''}
            </div>
        </div>
    `
}