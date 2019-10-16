import React from 'react';
import PropTypes from 'prop-types';

import Editor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import CKEditor from '@ckeditor/ckeditor5-react';
import styles from './styles.scss';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

// basic styles
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';

// alignment
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquoteediting';

// font
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';

// list
import ListEditing from '@ckeditor/ckeditor5-list/src/listediting';

// indent
import Indent from '@ckeditor/ckeditor5-indent/src/indent';

// heading
import Heading from '@ckeditor/ckeditor5-heading/src/heading';

// link
import Link from '@ckeditor/ckeditor5-link/src/link';

// media embed
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';

// table
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

// image
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageTextAlternative from '@ckeditor/ckeditor5-image/src/imagetextalternative';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';

// file
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

class Wysiwyg extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const onChange = (event, editor) => {
      this.props.onChange({
        target: {
          name: this.props.name,
          type: this.props.type,
          value: editor.getData(),
        },
      });
    };

    const jwtToken =
      sessionStorage.getItem('jwtToken').replace(/"/g, '') ||
      localStorage.getItem('jwtToken').replace(/"/g, '') ||
      '';
    const editorConfiguration = {
      plugins: [
        FileRepository,
        SimpleUploadAdapter,
        Essentials,
        Paragraph,
        BlockQuote,
        Bold,
        Italic,
        FontColor,
        FontBackgroundColor,
        Underline,
        Strikethrough,
        Code,
        Subscript,
        Superscript,
        RemoveFormat,
        Alignment,
        Heading,
        Link,
        Indent,
        MediaEmbed,
        ListEditing,
        Image,
        ImageToolbar,
        ImageStyle,
        ImageTextAlternative,
        ImageResize,
        ImageUpload,
        Table,
        TableToolbar,
      ],
      toolbar: [
        'undo',
        'redo',
        '|',
        'heading',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'fontColor',
        'fontBackgroundColor',
        'link',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'code',
        'blockQuote',
        'subscript',
        'superscript',
        'removeFormat',
        '|',
        'alignment',
        'outdent',
        'indent',
        '|',
        'insertTable',
        '|',
        'imageUpload',
        'mediaEmbed',
      ],
      image: {
        styles: ['full', 'alignLeft', 'alignRight'],
        toolbar: [
          'imageTextAlternative',
          '|',
          'imageStyle:alignLeft',
          'imageStyle:full',
          'imageStyle:alignRight',
        ],
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
      },
      simpleUpload: {
        uploadUrl: '/upload',
        headers: {
          'X-CSRF-TOKEN': 'CSFR-Token',
          Authorization: `Bearer ${jwtToken}`,
        },
      },
      indentBlock: {
        offset: 1,
        unit: 'em',
      },
    };

    return (
      <div className={styles.richTextEditorContainer}>
        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={this.props.value}
          onChange={onChange}
          ref={this.props.setRef}
        />
      </div>
    );
  }
}

Wysiwyg.defaultProps = {
  setRef: () => {},
  onChange: () => {},
  name: '',
  type: '',
  value: '',
};

Wysiwyg.propTypes = {
  setRef: PropTypes.func,
  onChange: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default Wysiwyg;
