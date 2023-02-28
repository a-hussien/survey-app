<?php

namespace App\Traits;

trait ApiResponses
{
    //success response
    protected function success($data, $msg = null, $code = 200)
    {
        return response()->json([
            'status' => 'Successful Request',
            'message' => $msg,
            'data' => $data,

        ], $code);
    }

    // error response
    protected function error($data, $msg = null, $code)
    {
        return response()->json([
            'status' => 'Failed Request',
            'message' => $msg,
            'data' => $data,

        ], $code);
    }
}
