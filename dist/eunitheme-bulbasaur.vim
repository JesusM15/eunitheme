
" EuniTheme Bulbasaur for Vim/Neovim
set background=dark
hi clear
if exists('syntax_on')
  syntax reset
endif
let g:colors_name = 'eunitheme-bulbasaur'

" Background colors
hi Normal guibg=#1e2720 guifg=#e6e9e9
hi CursorLine guibg=#2a342c
hi CursorColumn guibg=#2a342c
hi ColorColumn guibg=#2a342c

" Selection
hi Visual guibg=#3a443c
hi VisualNOS guibg=#2a342c

" Syntax highlighting
hi Comment guifg=#686b6d gui=italic
hi Constant guifg=#F7AA6C
hi String guifg=#A3D377
hi Character guifg=#A3D377
hi Number guifg=#F7AA6C
hi Boolean guifg=#fd8484ea
hi Float guifg=#F7AA6C

hi Identifier guifg=#d87272f1
hi Function guifg=#ECE180

hi Statement guifg=#ecdf94e1 gui=bold
hi Conditional guifg=#ecdf94e1 gui=bold
hi Repeat guifg=#ecdf94e1 gui=bold
hi Label guifg=#ecdf94e1
hi Operator guifg=#F26C6C
hi Keyword guifg=#ecdf94e1 gui=bold
hi Exception guifg=#D31356

hi PreProc guifg=#A1EF8B
hi Include guifg=#A1EF8B
hi Define guifg=#A1EF8B
hi Macro guifg=#A1EF8B

hi Type guifg=#dfa9ffe7
hi StorageClass guifg=#ecdf94e1
hi Structure guifg=#dfa9ffe7
hi Typedef guifg=#dfa9ffe7

hi Special guifg=#D31356
hi SpecialChar guifg=#D31356
hi Tag guifg=#f07178
hi Delimiter guifg=#555555

" UI elements
hi Cursor guibg=#D31356
hi lCursor guibg=#D31356
hi MatchParen guibg=#D31356 guifg=#1e2720
hi Search guibg=#D31356 guifg=#1e2720
hi IncSearch guibg=#ecdf94e1 guifg=#1e2720

" Status line
hi StatusLine guibg=#D31356 guifg=#e6e9e9
hi StatusLineNC guibg=#2a342c guifg=#e6e9e9

" Line numbers
hi LineNr guifg=#686b6d guibg=#1e2720
hi CursorLineNr guifg=#D31356 guibg=#2a342c
