
" EuniTheme Bulbasaur for Vim/Neovim
set background=dark
hi clear
if exists('syntax_on')
  syntax reset
endif
let g:colors_name = 'eunitheme-bulbasaur'

" Background colors
hi Normal guibg=#1a1f1a guifg=#e8e8e8
hi CursorLine guibg=#2a342c
hi CursorColumn guibg=#2a342c
hi ColorColumn guibg=#2a342c

" Selection
hi Visual guibg=#3a443c
hi VisualNOS guibg=#2a342c

" Syntax highlighting
hi Comment guifg=#686b6d gui=italic
hi Constant guifg=#FF9F40
hi String guifg=#98FB98
hi Character guifg=#98FB98
hi Number guifg=#FF9F40
hi Boolean guifg=#fd8484ea
hi Float guifg=#FF9F40

hi Identifier guifg=#FF6B9D
hi Function guifg=#4ECDC4

hi Statement guifg=#FFD93D gui=bold
hi Conditional guifg=#FFD93D gui=bold
hi Repeat guifg=#FFD93D gui=bold
hi Label guifg=#FFD93D
hi Operator guifg=#FF6B6B
hi Keyword guifg=#FFD93D gui=bold
hi Exception guifg=#D31356

hi PreProc guifg=#8FBC8F
hi Include guifg=#8FBC8F
hi Define guifg=#8FBC8F
hi Macro guifg=#8FBC8F

hi Type guifg=#C77DFF
hi StorageClass guifg=#FFD93D
hi Structure guifg=#C77DFF
hi Typedef guifg=#C77DFF

hi Special guifg=#D31356
hi SpecialChar guifg=#D31356
hi Tag guifg=#f07178
hi Delimiter guifg=#555555

" UI elements
hi Cursor guibg=#D31356
hi lCursor guibg=#D31356
hi MatchParen guibg=#D31356 guifg=#1a1f1a
hi Search guibg=#D31356 guifg=#1a1f1a
hi IncSearch guibg=#FFD93D guifg=#1a1f1a

" Status line
hi StatusLine guibg=#D31356 guifg=#e8e8e8
hi StatusLineNC guibg=#2a342c guifg=#e8e8e8

" Line numbers
hi LineNr guifg=#686b6d guibg=#1a1f1a
hi CursorLineNr guifg=#D31356 guibg=#2a342c
