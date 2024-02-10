//
import Card from './Card';
import Input from './Input';
import Dialog from './Dialog';
import Button from './Button';
import Skeleton from './Skeleton';
import Backdrop from './Backdrop';
import Progress from './Progress';
import Typography from './Typography';
import Pagination from './Pagination';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
    return Object.assign(
        Card(theme),
        Input(theme),
        Button(theme),
        Dialog(theme),
        Skeleton(theme),
        Backdrop(theme),
        Progress(theme),
        Typography(theme),
        Pagination(theme)
    );
}
